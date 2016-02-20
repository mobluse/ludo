<?php 
header('Content-Type: text/javascript');

$handle = fopen('ludopos.js', 'w');
if ($handle) {
    fwrite($handle, '{');
    $imgIdv = 'd1v';
    $divimgIdl = 'd1l';
    $divimgIdt = 'd1t';
    fwrite($handle, '"'.$imgIdv.'":"'.$_POST[$imgIdv]
                 .'","'.$divimgIdl.'":"'.$_POST[$divimgIdl]
                 .'","'.$divimgIdt.'":"'.$_POST[$divimgIdt].'"');
    for ($i = 0; $i < 4; ++$i) {
        for ($j = 0; $j < 4; ++$j) {
            $divimgIdl = 'p'.$i.$j.'l';
            $divimgIdt = 'p'.$i.$j.'t';
            fwrite($handle, ',"'.$divimgIdl.'":"'.$_POST[$divimgIdl]
                         .'","'.$divimgIdt.'":"'.$_POST[$divimgIdt].'"');
        }
    }
    fwrite($handle, '}');
    fclose($handle);
}
echo '{}';
?>
