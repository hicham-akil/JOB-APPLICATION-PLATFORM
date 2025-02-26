<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Allow API routes and Sanctum

    'allowed_methods' => ['*'], // Allow all HTTP methods

    'allowed_origins' => ['http://localhost:5173'], // Allow your frontend URL

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Allow all headers

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // Important for authentication with Sanctum
];
