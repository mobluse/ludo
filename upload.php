<?php 
// header('Content-Type: text/html');
$msg = 'Upload failed!';
if (isset($_POST['submit'])) {
    if (move_uploaded_file($_FILES['upload']['tmp_name'], 'img/players.tar.gz')) {
        $msg = 'The file has been uploaded!';
    } 
    else {
        $msg = 'The file could not be moved.';
    }
    require 'Archive/Tar.php';
    if (file_exists('img/players.tar.gz')) {
        $obj = new Archive_Tar('img/players.tar.gz'); // name of TAR file
    } 
    else {
        die('File does not exist');
    }
    $files = array('players.html');   // files to extract
    if ($obj->extractList($files, 'img/')) {
        $msg .= '<br />Extracted successfully!';
        $xml_parser = xml_parser_create();
    } 
    else {
        $msg .= '<br />Error in file extraction';
    }
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Ludo Players Uploaded</title>
</head>
<body>
<p><?php 
echo $msg; 
?></p>
</body>
</html>