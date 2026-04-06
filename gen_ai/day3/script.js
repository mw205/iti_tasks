const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messagesContainer");
const newChatBtn = document.getElementById("newChatBtn");
const chatHistory = document.getElementById("chatHistory");
const chatCount = document.getElementById("chatCount");
const currentChatTitle = document.getElementById("currentChatTitle");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const closeSidebarBtn = document.getElementById("closeSidebarBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const modelSelect = document.getElementById("modelSelect");
const selectedModelHint = document.getElementById("selectedModelHint");
const micBtn = document.getElementById("micBtn");
const attachmentBtn = document.getElementById("attachmentBtn");
const attachmentInput = document.getElementById("attachmentInput");
const attachmentPreview = document.getElementById("attachmentPreview");
const regenerateBtn = document.getElementById("regenerateBtn");
const editPromptBtn = document.getElementById("editPromptBtn");
const deletePromptBtn = document.getElementById("deletePromptBtn");
const CHAT_SESSION_INDEX_KEY = "novaChatSessionIds";
const ACTIVE_CHAT_SESSION_KEY = "novaChatActiveSessionId";
const THEME_STORAGE_KEY = "novaChatTheme";
let isRequestInFlight = false;
let pendingAttachments = [];
let activeStreamController = null;
let mediaRecorder = null;
let mediaStream = null;
let recordedAudioChunks = [];
let speakingMessageId = null;

let chats = [
  {
    id: 0,
    title: "New Conversation",
    messages: [],
    conversationHistory: [],
  },
];
let currentChatId = 0;
let conversationHistory = [];

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadChatFromStorage();
  updateSendButtonState();
});

function setupEventListeners() {
  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage();
  });

  messageInput.addEventListener("input", () => {
    autoResizeTextarea();
    updateSendButtonState();
  });

  messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  newChatBtn.addEventListener("click", createNewChat);
  mobileMenuBtn.addEventListener("click", openSidebar);
  closeSidebarBtn.addEventListener("click", closeSidebar);
  sidebarOverlay.addEventListener("click", closeSidebar);
  themeToggleBtn.addEventListener("click", toggleTheme);
  modelSelect.addEventListener("change", updateSelectedModelHint);
  micBtn.addEventListener("click", toggleAudioRecording);
  attachmentBtn.addEventListener("click", () => {
    attachmentInput.click();
  });
  attachmentInput.addEventListener("change", handleAttachmentSelection);
  regenerateBtn.addEventListener("click", regenerateLastResponse);
  editPromptBtn.addEventListener("click", editLastPrompt);
  deletePromptBtn.addEventListener("click", deleteLastPrompt);
  updateSelectedModelHint();
}

function sendMessage() {
  if (isRequestInFlight) {
    return;
  }

  const text = messageInput.value.trim();
  const attachments = [...pendingAttachments];

  if (!text && attachments.length === 0) {
    return;
  }

  addMessage(text, "user", attachments);
  conversationHistory.push({
    role: "user",
    parts: buildUserParts(text, attachments),
  });
  syncCurrentChatHistory();
  saveCurrentConversationHistory();
  messageInput.value = "";
  messageInput.style.height = "56px";
  clearPendingAttachments();
  setRequestState(true);
  requestAssistantResponse();
}

function addMessage(content, role, attachments = []) {
  const chat = chats.find((item) => item.id === currentChatId);
  if (!chat) {
    return;
  }

  chat.messages.push({
    id: `${role}-${Date.now()}-${crypto.randomUUID()}`,
    role,
    content,
    attachments,
  });

  if (chat.messages.length === 1 && role === "user") {
    updateChatTitle(chat.id, content.substring(0, 36));
  }

  renderMessages();
  updateSidebarUI();
}

function renderMessages() {
  const chat = chats.find((item) => item.id === currentChatId);
  currentChatTitle.textContent = chat?.title || "New Conversation";

  if (!chat || chat.messages.length === 0) {
    messagesContainer.innerHTML = getWelcomeMarkup();
    return;
  }

  messagesContainer.innerHTML = "";

  chat.messages.forEach((message) => {
    const messageRow = document.createElement("div");
    messageRow.className = `flex items-start gap-3 ${
      message.role === "user" ? "justify-end" : "justify-start"
    }`;

    const avatar = document.createElement("div");
    avatar.className =
      "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold transition-colors " +
      (message.role === "user"
        ? "order-2 border-teal-300/40 bg-teal-500/10 text-teal-700 dark:border-teal-300/20 dark:bg-teal-400/15 dark:text-teal-200"
        : "border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200");
    avatar.textContent = message.role === "user" ? "You" : "AI";

    const bubble = document.createElement("div");
    bubble.className =
      "max-w-[85%] rounded-[1.5rem] px-4 py-3 text-sm leading-7 shadow-lg transition-colors md:max-w-[75%] " +
      (message.role === "user"
        ? "rounded-tr-md bg-teal-500 text-white dark:text-slate-950"
        : "markdown-content rounded-tl-md border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-100");

    if (message.role === "assistant") {
      bubble.innerHTML = renderMarkdown(message.content);
    } else {
      bubble.textContent = message.content;
    }

    const assistantControls = document.createElement("div");
    assistantControls.className = "flex items-center gap-2";
    if (message.role === "assistant" && message.content) {
      const speakerBtn = document.createElement("button");
      speakerBtn.type = "button";
      speakerBtn.className =
        "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/10";
      speakerBtn.setAttribute("aria-label", "Read message aloud");
      speakerBtn.innerHTML = `
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M4.5 12.5h2.75L11 15.5v-11L7.25 7.5H4.5v5Z" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13.5 7.5a4 4 0 0 1 0 5m1.75-7a6.5 6.5 0 0 1 0 9" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `;
      speakerBtn.addEventListener("click", () => {
        toggleSpeechPlayback(message.id, message.content);
      });
      assistantControls.appendChild(speakerBtn);
    }

    if (Array.isArray(message.attachments) && message.attachments.length > 0) {
      const wrapper = document.createElement("div");
      wrapper.className = "flex max-w-[85%] flex-col gap-3 md:max-w-[75%]";
      wrapper.appendChild(renderAttachments(message.attachments));
      if (message.content) {
        wrapper.appendChild(bubble);
      }
      if (assistantControls.childElementCount > 0) {
        wrapper.appendChild(assistantControls);
      }
      if (message.role === "user") {
        messageRow.appendChild(wrapper);
        messageRow.appendChild(avatar);
      } else {
        messageRow.appendChild(avatar);
        messageRow.appendChild(wrapper);
      }
      messagesContainer.appendChild(messageRow);
      return;
    }

    if (message.role === "user") {
      messageRow.appendChild(bubble);
      messageRow.appendChild(avatar);
    } else {
      messageRow.appendChild(avatar);
      const assistantWrapper = document.createElement("div");
      assistantWrapper.className = "flex max-w-[85%] flex-col gap-2 md:max-w-[75%]";
      assistantWrapper.appendChild(bubble);
      if (assistantControls.childElementCount > 0) {
        assistantWrapper.appendChild(assistantControls);
      }
      messageRow.appendChild(assistantWrapper);
    }

    messagesContainer.appendChild(messageRow);
  });

  scrollToBottom();
  updatePromptActionState();
}

function getWelcomeMarkup() {
  return `
    <div class="flex min-h-full flex-1 items-center justify-center py-8">
      <div class="w-full max-w-3xl">
        <div class="rounded-[2rem] border border-slate-200 bg-white/80 p-8 text-center shadow-soft dark:border-white/10 dark:bg-slate-950/40">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-teal-500/10 text-2xl text-teal-700 dark:bg-teal-400/15 dark:text-teal-200">✦</div>
          <p class="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-teal-700/75 dark:text-teal-300/75">Professional AI Workspace</p>
          <h3 class="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Start a sharper conversation</h3>
          <p class="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400 md:text-base">
            Draft content, break down complex topics, or explore ideas in a cleaner chat interface built for focus.
          </p>
          <div class="mt-8 grid gap-3 text-left md:grid-cols-3">
            <div class="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
              <p class="font-semibold text-slate-900 dark:text-white">Summarize documents</p>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Turn long information into a clear brief.</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
              <p class="font-semibold text-slate-900 dark:text-white">Generate drafts</p>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Create emails, notes, and polished first versions.</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
              <p class="font-semibold text-slate-900 dark:text-white">Think step by step</p>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Plan work, compare options, and refine decisions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function autoResizeTextarea() {
  messageInput.style.height = "56px";
  const nextHeight = Math.min(messageInput.scrollHeight, 208);
  messageInput.style.height = `${nextHeight}px`;
}

function updateSendButtonState() {
  sendBtn.disabled =
    isRequestInFlight ||
    (messageInput.value.trim().length === 0 && pendingAttachments.length === 0);
}

function scrollToBottom() {
  messagesContainer.parentElement.scrollTop =
    messagesContainer.parentElement.scrollHeight;
}

function createNewChat() {
  const newId = Math.max(...chats.map((chat) => chat.id), -1) + 1;
  chats.unshift({
    id: newId,
    title: "New Conversation",
    messages: [],
    conversationHistory: [],
  });

  currentChatId = newId;
  conversationHistory = [];
  clearPendingAttachments();
  renderMessages();
  updateSidebarUI();
  saveCurrentConversationHistory();
  messageInput.focus();
  closeSidebar();
}

function setCurrentChat(chatId) {
  loadChatSession(chatId);
  closeSidebar();
}

function updateChatTitle(chatId, text) {
  const chat = chats.find((item) => item.id === chatId);
  if (chat) {
    chat.title = text || "New Conversation";
  }
}

function updateSidebarUI() {
  chatHistory.innerHTML = "";
  chatCount.textContent = chats.length.toString();

  chats.forEach((chat) => {
    const item = document.createElement("div");
    item.className =
      "group flex cursor-pointer items-center gap-3 rounded-2xl border px-3 py-3 transition-colors " +
      (chat.id === currentChatId
        ? "border-teal-300/40 bg-teal-500/10 dark:border-teal-300/20 dark:bg-teal-400/10"
        : "border-transparent bg-transparent hover:border-slate-200 hover:bg-slate-50/90 dark:hover:border-white/10 dark:hover:bg-white/5");
    item.dataset.chatId = chat.id;

    const badge = document.createElement("div");
    badge.className =
      "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-xs font-bold transition-colors " +
      (chat.id === currentChatId
        ? "bg-teal-500/10 text-teal-700 dark:bg-teal-300/15 dark:text-teal-200"
        : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300");
    badge.textContent = String(chat.title || "N")
      .charAt(0)
      .toUpperCase();

    const content = document.createElement("div");
    content.className = "min-w-0 flex-1";

    const title = document.createElement("p");
    title.className =
      "truncate text-sm font-semibold " +
      (chat.id === currentChatId
        ? "text-slate-900 dark:text-white"
        : "text-slate-700 dark:text-slate-200");
    title.textContent = chat.title;

    const preview = document.createElement("p");
    preview.className = "truncate text-xs text-slate-500 dark:text-slate-500";
    preview.textContent =
      chat.messages[chat.messages.length - 1]?.content || "No messages yet";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className =
      "rounded-xl border border-slate-200 p-2 text-slate-500 opacity-0 transition hover:border-rose-400/40 hover:bg-rose-400/10 hover:text-rose-700 group-hover:opacity-100 dark:border-white/10 dark:text-slate-400 dark:hover:border-rose-400/30 dark:hover:text-rose-200";
    deleteBtn.setAttribute("aria-label", `Delete ${chat.title}`);
    deleteBtn.innerHTML = `
      <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="M6 7h8m-7 0v7m6-7v7M8 4h4m-7 3 .5 8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2L14 7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;
    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteChat(chat.id);
    });

    content.appendChild(title);
    content.appendChild(preview);

    item.appendChild(badge);
    item.appendChild(content);
    item.appendChild(deleteBtn);

    item.addEventListener("click", () => {
      setCurrentChat(chat.id);
    });

    chatHistory.appendChild(item);
  });
}

function deleteChat(chatId) {
  chats = chats.filter((chat) => chat.id !== chatId);

  if (chats.length === 0) {
    chats = [
      {
        id: 0,
        title: "New Conversation",
        messages: [],
        conversationHistory: [],
      },
    ];
  }

  if (!chats.find((chat) => chat.id === currentChatId)) {
    currentChatId = chats[0].id;
  }

  conversationHistory = getCurrentChat().conversationHistory || [];

  renderMessages();
  updateSidebarUI();
  removeChatSession(chatId);
}

function loadChatFromStorage() {
  loadSavedChatSessions();
}

function openSidebar() {
  sidebar.classList.remove("-translate-x-full");
  sidebarOverlay.classList.remove("pointer-events-none", "opacity-0");
  sidebarOverlay.classList.add("opacity-100");
}

function closeSidebar() {
  sidebar.classList.add("-translate-x-full");
  sidebarOverlay.classList.add("pointer-events-none", "opacity-0");
  sidebarOverlay.classList.remove("opacity-100");
}

async function requestAssistantResponse() {
  const typingBubbleId = addTypingIndicator();

  try {
    const selectedModel = modelSelect.value;
    removeTypingIndicator(typingBubbleId);

    if (selectedModel === "gemini-text") {
      await streamGeminiTextResponse();
    } else {
      const data = await submitToSelectedModel(selectedModel);
      const reply = data.reply || "";
      const generatedImages = Array.isArray(data.generatedImages)
        ? data.generatedImages
        : [];
      addMessage(
        reply ||
          (generatedImages.length > 0
            ? "Generated image based on your prompt."
            : "I could not generate a response."),
        "assistant",
        generatedImages,
      );
      conversationHistory.push({
        role: "model",
        parts: [{ text: reply || "Generated image response." }],
      });
      syncCurrentChatHistory();
      saveCurrentConversationHistory();
    }
  } catch (error) {
    removeTypingIndicator(typingBubbleId);
    removeEmptyTrailingAssistantPlaceholder();
    addMessage(
      error.message || "Something went wrong while contacting Gemini.",
      "assistant",
    );
  } finally {
    activeStreamController = null;
    setRequestState(false);
  }
}

async function streamGeminiTextResponse() {
  const placeholderMessage = createAssistantPlaceholderMessage();
  const response = await fetch("/api/chat/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversationHistory,
      model: "gemini-2.0-flash",
      mode: "text",
    }),
  });

  if (!response.ok || !response.body) {
    const data = await parseApiResponse(response);
    throw new Error(data.error || "Gemini streaming request failed.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let finalReply = "";

  activeStreamController = reader;

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() || "";

    for (const eventBlock of events) {
      const parsedEvent = parseSseEvent(eventBlock);
      if (!parsedEvent) {
        continue;
      }

      if (parsedEvent.type === "chunk") {
        finalReply += parsedEvent.text || "";
        placeholderMessage.content = finalReply;
        renderMessages();
      }

      if (parsedEvent.type === "error") {
        throw new Error(parsedEvent.error || "Streaming failed.");
      }
    }
  }

  activeStreamController = null;

  if (!finalReply.trim()) {
    placeholderMessage.content = "I could not generate a response.";
  }

  conversationHistory.push({
    role: "model",
    parts: [{ text: placeholderMessage.content }],
  });
  syncCurrentChatHistory();
  saveCurrentConversationHistory();
  renderMessages();
}

function setRequestState(nextState) {
  isRequestInFlight = nextState;
  messageInput.disabled = nextState;
  micBtn.disabled = nextState;
  attachmentBtn.disabled = nextState;
  attachmentInput.disabled = nextState;
  modelSelect.disabled = nextState;
  regenerateBtn.disabled = nextState;
  editPromptBtn.disabled = nextState;
  deletePromptBtn.disabled = nextState;
  messageInput.placeholder = nextState
    ? `${getActiveModelLabel()} is responding...`
    : "Ask for a summary, plan, rewrite, or explanation...";
  updateSendButtonState();
  if (!nextState) {
    updatePromptActionState();
  }
}

function addTypingIndicator() {
  const id = `typing-${Date.now()}`;
  const row = document.createElement("div");
  row.className = "flex items-start gap-3 justify-start";
  row.dataset.typingId = id;
  row.innerHTML = `
    <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">AI</div>
    <div class="rounded-tl-md max-w-[85%] rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-lg dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300 md:max-w-[75%]">
      <div class="flex items-center gap-2">
        <span class="h-2.5 w-2.5 animate-pulse rounded-full bg-teal-500 dark:bg-teal-300"></span>
        <span class="h-2.5 w-2.5 animate-pulse rounded-full bg-teal-500 [animation-delay:150ms] dark:bg-teal-300"></span>
        <span class="h-2.5 w-2.5 animate-pulse rounded-full bg-teal-500 [animation-delay:300ms] dark:bg-teal-300"></span>
      </div>
    </div>
  `;

  messagesContainer.appendChild(row);
  scrollToBottom();
  return id;
}

function removeTypingIndicator(id) {
  const indicator = messagesContainer.querySelector(`[data-typing-id="${id}"]`);
  if (indicator) {
    indicator.remove();
  }
}

function getCurrentChat() {
  return chats.find((chat) => chat.id === currentChatId);
}

function syncCurrentChatHistory() {
  const chat = getCurrentChat();
  if (chat) {
    chat.conversationHistory = conversationHistory;
    chat.title = getChatTitleFromHistory(conversationHistory);
  }
}

function buildConversationHistoryFromMessages(messages = []) {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

function buildMessagesFromConversationHistory(history = []) {
  return history.map((entry, index) => ({
    id: `message-${Date.now()}-${index}`,
    role: entry.role === "model" ? "assistant" : "user",
    content: entry.parts?.find((part) => typeof part.text === "string")?.text || "",
    attachments: [],
  }));
}

function saveCurrentConversationHistory() {
  const chat = getCurrentChat();
  if (!chat) {
    return;
  }

  const session = {
    id: chat.id,
    title: getChatTitleFromHistory(conversationHistory),
    conversationHistory,
    messages: chat.messages,
    updatedAt: Date.now(),
  };

  localStorage.setItem(getSessionStorageKey(chat.id), JSON.stringify(session));
  upsertSessionId(chat.id);
  localStorage.setItem(ACTIVE_CHAT_SESSION_KEY, String(chat.id));
}

function loadSavedChatSessions() {
  const sessionIds = getStoredSessionIds();
  const storedCurrentChat = localStorage.getItem(ACTIVE_CHAT_SESSION_KEY);
  const loadedChats = sessionIds
    .map((sessionId) => readChatSession(sessionId))
    .filter(Boolean)
    .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0))
    .map((session) => ({
      id: session.id,
      title: session.title || "New Conversation",
      conversationHistory: Array.isArray(session.conversationHistory)
        ? session.conversationHistory
        : [],
      messages: Array.isArray(session.messages)
        ? normalizeStoredMessages(session.messages)
        : buildMessagesFromConversationHistory(session.conversationHistory),
    }));

  chats =
    loadedChats.length > 0
      ? loadedChats
      : [
          {
            id: 0,
            title: "New Conversation",
            messages: [],
            conversationHistory: [],
          },
        ];

  currentChatId = storedCurrentChat
    ? Number.parseInt(storedCurrentChat, 10)
    : chats[0].id;

  if (!chats.find((chat) => chat.id === currentChatId)) {
    currentChatId = chats[0].id;
  }

  if (readChatSession(currentChatId)) {
    loadChatSession(currentChatId);
    return;
  }

  conversationHistory = getCurrentChat().conversationHistory || [];
  renderMessages();
  updateSidebarUI();
}

function loadChatSession(sessionId) {
  const session = readChatSession(sessionId);

  if (!session) {
    return;
  }

  currentChatId = session.id;
  conversationHistory = Array.isArray(session.conversationHistory)
    ? session.conversationHistory
    : [];
  clearPendingAttachments();

  const existingChatIndex = chats.findIndex((chat) => chat.id === session.id);
  const hydratedChat = {
    id: session.id,
    title: session.title || getChatTitleFromHistory(conversationHistory),
    conversationHistory,
    messages: Array.isArray(session.messages)
      ? normalizeStoredMessages(session.messages)
      : buildMessagesFromConversationHistory(conversationHistory),
  };

  if (existingChatIndex >= 0) {
    chats[existingChatIndex] = hydratedChat;
  } else {
    chats.unshift(hydratedChat);
  }

  messagesContainer.innerHTML = "";
  renderMessages();
  updateSidebarUI();
  localStorage.setItem(ACTIVE_CHAT_SESSION_KEY, String(session.id));
}

function getChatTitleFromHistory(history = []) {
  const firstUserMessage = history.find((entry) => entry.role === "user");
  const text = firstUserMessage?.parts?.[0]?.text?.trim();
  return text ? text.split(/\s+/).slice(0, 6).join(" ") : "New Conversation";
}

function getSessionStorageKey(sessionId) {
  return `novaChatSession:${sessionId}`;
}

function getStoredSessionIds() {
  try {
    const raw = localStorage.getItem(CHAT_SESSION_INDEX_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to read stored session ids:", error);
    return [];
  }
}

function upsertSessionId(sessionId) {
  const sessionIds = getStoredSessionIds().filter((id) => id !== sessionId);
  sessionIds.unshift(sessionId);
  localStorage.setItem(CHAT_SESSION_INDEX_KEY, JSON.stringify(sessionIds));
}

function readChatSession(sessionId) {
  try {
    const raw = localStorage.getItem(getSessionStorageKey(sessionId));
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error(`Failed to read chat session ${sessionId}:`, error);
    return null;
  }
}

function normalizeStoredMessages(messages = []) {
  return messages.map((message, index) => ({
    id: message.id || `message-${Date.now()}-${index}`,
    role: message.role,
    content: message.content || "",
    attachments: Array.isArray(message.attachments) ? message.attachments : [],
  }));
}

function removeChatSession(sessionId) {
  localStorage.removeItem(getSessionStorageKey(sessionId));
  const nextSessionIds = getStoredSessionIds().filter((id) => id !== sessionId);
  localStorage.setItem(CHAT_SESSION_INDEX_KEY, JSON.stringify(nextSessionIds));
  localStorage.setItem(ACTIVE_CHAT_SESSION_KEY, String(currentChatId));
}

function createAssistantPlaceholderMessage() {
  const chat = getCurrentChat();
  if (!chat) {
    throw new Error("No active chat found.");
  }

  const placeholder = {
    id: `assistant-${Date.now()}-${crypto.randomUUID()}`,
    role: "assistant",
    content: "",
    attachments: [],
  };

  chat.messages.push(placeholder);
  renderMessages();
  return placeholder;
}

function parseSseEvent(block) {
  const lines = block.split("\n");
  let data = "";

  for (const line of lines) {
    if (line.startsWith("data:")) {
      data += line.slice(5).trim();
    }
  }

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}

function removeEmptyTrailingAssistantPlaceholder() {
  const chat = getCurrentChat();
  const lastMessage = chat?.messages?.[chat.messages.length - 1];

  if (lastMessage?.role === "assistant" && !lastMessage.content && (!lastMessage.attachments || lastMessage.attachments.length === 0)) {
    chat.messages.pop();
    renderMessages();
  }
}

function updatePromptActionState() {
  const canModifyLastPrompt = !isRequestInFlight && getLastUserMessageIndex() !== -1;
  regenerateBtn.disabled = !canModifyLastPrompt;
  editPromptBtn.disabled = !canModifyLastPrompt;
  deletePromptBtn.disabled = !canModifyLastPrompt;
}

function getLastUserMessageIndex() {
  const chat = getCurrentChat();
  if (!chat) {
    return -1;
  }

  for (let index = chat.messages.length - 1; index >= 0; index -= 1) {
    if (chat.messages[index].role === "user") {
      return index;
    }
  }

  return -1;
}

function removeLastPromptTurn({ prefill = false, keepUser = false } = {}) {
  const chat = getCurrentChat();
  const lastUserIndex = getLastUserMessageIndex();

  if (!chat || lastUserIndex === -1) {
    return null;
  }

  const spliceStart = keepUser ? lastUserIndex + 1 : lastUserIndex;
  const removedMessages = chat.messages.splice(spliceStart);
  const lastUserMessage = removedMessages.find((message) => message.role === "user");
  const removedConversationEntryIndex = findLastConversationUserIndex();

  if (removedConversationEntryIndex !== -1 && !keepUser) {
    conversationHistory = conversationHistory.slice(0, removedConversationEntryIndex);
  } else if (
    removedConversationEntryIndex !== -1 &&
    keepUser &&
    conversationHistory[conversationHistory.length - 1]?.role === "model"
  ) {
    conversationHistory = conversationHistory.slice(0, conversationHistory.length - 1);
  }

  syncCurrentChatHistory();
  saveCurrentConversationHistory();
  renderMessages();
  updateSidebarUI();

  const sourceUserMessage = keepUser ? chat.messages[lastUserIndex] : lastUserMessage;

  if (prefill && sourceUserMessage) {
    messageInput.value = sourceUserMessage.content || "";
    pendingAttachments = Array.isArray(sourceUserMessage.attachments)
      ? [...sourceUserMessage.attachments]
      : [];
    renderPendingAttachments();
    autoResizeTextarea();
    updateSendButtonState();
    messageInput.focus();
  }

  return keepUser ? chat.messages[lastUserIndex] : sourceUserMessage;
}

function regenerateLastResponse() {
  if (isRequestInFlight) {
    return;
  }

  const removedMessage = removeLastPromptTurn({ keepUser: true });
  if (!removedMessage) {
    return;
  }

  setRequestState(true);
  requestAssistantResponse();
}

function editLastPrompt() {
  if (isRequestInFlight) {
    return;
  }

  removeLastPromptTurn({ prefill: true });
}

function deleteLastPrompt() {
  if (isRequestInFlight) {
    return;
  }

  clearPendingAttachments();
  removeLastPromptTurn();
}

function findLastConversationUserIndex() {
  for (let index = conversationHistory.length - 1; index >= 0; index -= 1) {
    if (conversationHistory[index].role === "user") {
      return index;
    }
  }

  return -1;
}

function renderMarkdown(content) {
  if (!window.marked) {
    return escapeHtml(content);
  }

  return window.marked.parse(escapeHtml(content), {
    breaks: true,
    gfm: true,
  });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
}

async function submitToSelectedModel(model) {
  switch (model) {
    case "gemini-text":
      return submitToGemini();
    case "hf-flux-schnell-image":
      return submitToHuggingFaceImage();
    default:
      throw new Error("Unsupported model selected.");
  }
}

async function submitToGemini() {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversationHistory,
      model: "gemini-2.0-flash",
      mode: "text",
    }),
  });

  const data = await parseApiResponse(response);
  if (!response.ok) {
    throw new Error(data.error || "Gemini request failed.");
  }

  return data;
}

async function submitToHuggingFaceImage() {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversationHistory,
      model: "hf-flux-schnell-image",
      mode: "image",
    }),
  });

  const data = await parseApiResponse(response);
  if (!response.ok) {
    throw new Error(data.error || "Hugging Face image request failed.");
  }

  return data;
}

async function parseApiResponse(response) {
  const rawBody = await response.text();

  if (!rawBody) {
    throw new Error(
      response.ok
        ? "The server returned an empty response."
        : "The server returned an empty error response.",
    );
  }

  try {
    return JSON.parse(rawBody);
  } catch (error) {
    if (!response.ok) {
      throw new Error(rawBody);
    }

    throw new Error("The server returned invalid JSON.");
  }
}

function handleAttachmentSelection(event) {
  const files = Array.from(event.target.files || []);

  if (files.length === 0) {
    return;
  }

  Promise.all(files.map(createAttachmentRecord))
    .then((attachments) => {
      pendingAttachments = [...pendingAttachments, ...attachments];
      renderPendingAttachments();
      updateSendButtonState();
      attachmentInput.value = "";
    })
    .catch((error) => {
      console.error("Failed to read attachment:", error);
    });
}

function createAttachmentRecord(file) {
  return new Promise((resolve, reject) => {
    const attachment = {
      id: `${file.name}-${file.size}-${Date.now()}`,
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      isImage: file.type.startsWith("image/"),
      isAudio: file.type.startsWith("audio/"),
      previewUrl: "",
      base64Data: "",
    };

    if (!attachment.isImage) {
      resolve(attachment);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        ...attachment,
        previewUrl: reader.result,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderPendingAttachments() {
  attachmentPreview.innerHTML = "";

  if (pendingAttachments.length === 0) {
    attachmentPreview.classList.add("hidden");
    return;
  }

  attachmentPreview.classList.remove("hidden");
  attachmentPreview.appendChild(renderAttachments(pendingAttachments, true));
}

function renderAttachments(attachments, removable = false) {
  const container = document.createElement("div");
  container.className = "flex flex-wrap gap-3";

  attachments.forEach((attachment) => {
    const item = document.createElement("div");
    item.className =
      "group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-white/5";

    if (attachment.isImage && attachment.previewUrl) {
      item.innerHTML = `
        <img src="${attachment.previewUrl}" alt="${escapeAttribute(attachment.name)}" class="h-24 w-24 rounded-xl object-cover" />
        <p class="mt-2 max-w-24 truncate text-xs font-medium text-slate-600 dark:text-slate-300">${escapeHtml(attachment.name)}</p>
      `;
    } else if (attachment.isAudio) {
      item.innerHTML = `
        <div class="flex h-24 w-24 items-center justify-center rounded-xl bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">AUDIO</div>
        <p class="mt-2 max-w-24 truncate text-xs font-medium text-slate-600 dark:text-slate-300">${escapeHtml(attachment.name)}</p>
      `;
    } else {
      item.innerHTML = `
        <div class="flex h-24 w-24 items-center justify-center rounded-xl bg-slate-200 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">FILE</div>
        <p class="mt-2 max-w-24 truncate text-xs font-medium text-slate-600 dark:text-slate-300">${escapeHtml(attachment.name)}</p>
      `;
    }

    if (removable) {
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className =
        "absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-950/70 text-xs text-white";
      removeBtn.textContent = "x";
      removeBtn.addEventListener("click", () => {
        pendingAttachments = pendingAttachments.filter(
          (itemData) => itemData.id !== attachment.id,
        );
        renderPendingAttachments();
        updateSendButtonState();
      });
      item.appendChild(removeBtn);
    }

    container.appendChild(item);
  });

  return container;
}

function clearPendingAttachments() {
  pendingAttachments = [];
  renderPendingAttachments();
  attachmentInput.value = "";
}

function buildPromptText(text, attachments) {
  const trimmedText = text.trim();

  if (attachments.length === 0) {
    return trimmedText;
  }

  const attachmentSummary = `Uploaded attachments: ${attachments
    .map((attachment) => attachment.name)
    .join(", ")}`;

  return trimmedText
    ? `${trimmedText}\n\n${attachmentSummary}`
    : attachmentSummary;
}

function buildUserParts(text, attachments) {
  const parts = [];
  const promptText = buildPromptText(text, attachments);

  if (promptText) {
    parts.push({ text: promptText });
  }

  attachments
    .filter((attachment) => attachment.base64Data && attachment.type)
    .forEach((attachment) => {
      parts.push({
        inlineData: {
          mimeType: attachment.type,
          data: attachment.base64Data,
        },
      });
    });

  return parts.length > 0 ? parts : [{ text: "" }];
}

function updateSelectedModelHint() {
  selectedModelHint.textContent =
    modelSelect.value === "hf-flux-schnell-image"
      ? "FLUX.1 Schnell image generation is active."
      : "Gemini 2.0 Flash text chat is active.";
}

function getActiveModelLabel() {
  return modelSelect.options[modelSelect.selectedIndex].text;
}

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
}

async function toggleAudioRecording() {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    addMessage("Microphone access is not supported in this browser.", "assistant");
    return;
  }

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordedAudioChunks = [];
    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        recordedAudioChunks.push(event.data);
      }
    });

    mediaRecorder.addEventListener("stop", async () => {
      const audioBlob = new Blob(recordedAudioChunks, {
        type: mediaRecorder.mimeType || "audio/webm",
      });
      const base64Data = await blobToBase64(audioBlob);
      pendingAttachments = [
        ...pendingAttachments,
        {
          id: `audio-${Date.now()}`,
          name: `voice-note-${new Date().toISOString().slice(11, 19)}.webm`,
          type: audioBlob.type || "audio/webm",
          size: audioBlob.size,
          isImage: false,
          isAudio: true,
          previewUrl: "",
          base64Data,
        },
      ];
      renderPendingAttachments();
      updateSendButtonState();
      setMicButtonState(false);
      cleanupMediaStream();
    });

    mediaRecorder.start();
    setMicButtonState(true);
  } catch (error) {
    console.error("Microphone error:", error);
    addMessage("Unable to access the microphone.", "assistant");
    cleanupMediaStream();
    setMicButtonState(false);
  }
}

function setMicButtonState(isRecording) {
  micBtn.classList.toggle("bg-rose-500", isRecording);
  micBtn.classList.toggle("text-white", isRecording);
  micBtn.classList.toggle("border-rose-500", isRecording);
  micBtn.classList.toggle("dark:text-white", isRecording);
}

function cleanupMediaStream() {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
  }

  mediaStream = null;
  mediaRecorder = null;
  recordedAudioChunks = [];
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result || "";
      resolve(String(result).split(",")[1] || "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function toggleSpeechPlayback(messageId, text) {
  if (!("speechSynthesis" in window)) {
    return;
  }

  if (speakingMessageId === messageId) {
    speechSynthesis.cancel();
    speakingMessageId = null;
    return;
  }

  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  speakingMessageId = messageId;
  utterance.addEventListener("end", () => {
    speakingMessageId = null;
  });
  utterance.addEventListener("error", () => {
    speakingMessageId = null;
  });
  speechSynthesis.speak(utterance);
}
