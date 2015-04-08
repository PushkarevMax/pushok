<?php
function protect($contact) {
    $result = "";
    for ($i = 0; $i < strlen($contact); $i++) $result .= "&#".ord(substr($contact, $i, 1)).";";
    return $result;
}
?>