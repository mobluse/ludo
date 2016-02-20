<?php
header('Content-Type: text/plain');

/**
 * Add a link with an added extension to matching files.
 * @param string $dir the directory name
 * @param string $ext extension to match
 * @param string $ext2add the extension to add
 */
function addLinkExt($dir, $ext, $ext2add) {
    foreach (glob($dir) as $file) {
        if (!is_dir($file)) {
            if (strcmp(substr($file, strrpos($file, '.')+1), $ext) == 0) { 
                $newLink = $file . $ext2add;
                if(symlink($file, $newLink)) {
                    echo "$newLink\n";
                }
            }
        }
    }
}

addLinkExt('*', 'php', 's.txt');
