<?php
header('Content-Type: text/javascript');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');
echo file_get_contents('ludopos.js');
