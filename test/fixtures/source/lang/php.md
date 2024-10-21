---
title: language php test
---

## paste manual
```php
<?php
require __DIR__ . '/../vendor/autoload.php';

use Curl\Curl;

// curl --request DELETE "https://httpbin.org/delete?key=value" --data "a=1&b=2&c=3"

$curl = new Curl();
$curl->delete(
    'https://httpbin.org/delete',
    [
        'key' => 'value',
    ],
    [
        'a' => '1',
        'b' => '2',
        'c' => '3',
    ]
);

if ($curl->error) {
    echo 'Error: ' . $curl->errorMessage . "\n";
} else {
    echo 'Data server received via DELETE:' . "\n";
    var_dump($curl->response->form);
}
```

## github shortcode

{% github https://github.com/php-curl-class/php-curl-class/blob/master/examples/delete.php %}