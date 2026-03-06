<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <style>
        .login-contianer {
            max-width: 400px;
            margin: 0 auto;
        }
    </style>
</head>

<body>
    <div class="container mt-5 login-contianer">
        <form action="controller.php?action=login" method="post">
            <div class="mb-3">
                <label class="form-label" for="email">Email</label>
                <input class="form-control" type="text" name="email" id="email">
            </div>
            <div class="mb-3">
                <label class="form-label" for="password">Password</label>
                <input class="form-control" type="password" name="password" id="password">
            </div>
            <div class="mb-5">
                <button type="submit" class="btn btn-primary">Login</button>
            </div>
            <p><a href="index.php" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover text-center">Don't Have an Account?</a></p>

        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</body>

</html>