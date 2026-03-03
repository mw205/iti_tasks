package com.mycompany.bookstore;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.JsonWriter;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.stream.JsonGenerator;
import jakarta.json.stream.JsonParser;

public class Bookstore {

    private static final String LIBFILE = "src/main/resources/lib.json";

    public static void main(String[] args) {
        runObjectModelAPI();
        runStreamApi();
        runJsonBinding();
    }

    private static void runObjectModelAPI() {

        try (InputStream is = new FileInputStream(LIBFILE); JsonReader reader = Json.createReader(is)) {

            JsonObject libraryObject = reader.readObject();
            System.out.println("[Object Model Read] Location: " + libraryObject.getString("location"));
            System.out.println("[Object Model Read] Librarian: " + libraryObject.getString("librarian"));

        } catch (IOException e) {
            e.printStackTrace();
        }
        // write
        String outputLibFile = "src/main/resources/lib_object_model_api.json";
        JsonObject newLibrary = Json.createObjectBuilder()
                .add("location", "location")
                .add("description", "lib_description")
                .add("librarian", "Waleed Mohamed")
                .add("books", Json.createArrayBuilder()
                        .add(Json.createObjectBuilder()
                                .add("title", "book_title")
                                .add("isbn", "123456")
                        )
                )
                .build();
        try (OutputStream os = new FileOutputStream(outputLibFile); JsonWriter writer = Json.createWriter(os)) {
            writer.writeObject(newLibrary);
            System.out.println("[Object Model Write] File written to: " + outputLibFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void runStreamApi() {
        // READ
        try (InputStream is = new FileInputStream(LIBFILE); JsonParser parser = Json.createParser(is)) {

            System.out.print("[Stream API Read] Keys found: ");
            while (parser.hasNext()) {
                JsonParser.Event event = parser.next();
                if (event == JsonParser.Event.KEY_NAME) {
                    System.out.print(parser.getString() + " ");
                }
            }
            System.out.println();

        } catch (IOException e) {
            e.printStackTrace();
        }

        String outputFile = "src/main/resources/lib_stream_out.json";
        try (OutputStream os = new FileOutputStream(outputFile); JsonGenerator generator = Json.createGenerator(os)) {

            generator.writeStartObject()
                    .write("location", "Mansoura,Egypt")
                    .write("description", "Stream API Generated Library")
                    .write("librarian", "Mohamed Waleed")
                    .writeStartArray("books")
                    .writeStartObject()
                    .write("title", "Stream Book")
                    .write("isbn", "789-012")
                    .writeEnd()
                    .writeEnd()
                    .writeEnd();

            System.out.println("[Stream API Write] File written to: " + outputFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void runJsonBinding() {
        try (Jsonb jsonb = JsonbBuilder.create()) {

            Library library;
            try (InputStream is = new FileInputStream(LIBFILE)) {
                library = jsonb.fromJson(is, Library.class);
                System.out.println("[JSON-B Read] Deserialized Library Location: " + library.location);
                System.out.println("[JSON-B Read] Number of books: " + (library.books != null ? library.books.size() : 0));
            }

            if (library != null) {
                library.description = "Updated library description via JSON-B";
                String outputFile = "src/main/resources/lib_jsonb_out.json";
                try (OutputStream os = new FileOutputStream(outputFile)) {
                    jsonb.toJson(library, os);
                    System.out.println("[JSON-B Write] Object serialized and written to: " + outputFile);
                }
            }

        } catch (Exception e) {
        }
    }
}
