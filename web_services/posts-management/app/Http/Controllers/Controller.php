<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

abstract class Controller
{
    //
    protected function success($data, $message, $status)
    {
        if (!$data) {
            return response(["success" => true, "message" => $message], $status);
        }
        return response(["success" => true, "data" => $data, "message" => $message], $status);
    }
    protected function failure($errors, $message, $status)
    {
        if (!$errors) {
            return response(["success" => false, "message" => $message], $status);
        }
        return response(["success" => false, "errors" => $errors, "message" => $message], $status);
    }
}
