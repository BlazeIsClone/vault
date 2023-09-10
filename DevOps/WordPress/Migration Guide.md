export database wp db export # zip everything tar -zcvf ../my-website-all-1.tar.gz .

get file from external url wget https://www.mywebsite.com/my-website-all-1.tar.gz # get file from external url with htpasswd protection wget –user=user123 –password=mypass321 https://www.mywebsite.com/my-website-all-1.tar.gz


unpack files tar -zxvf my-website-all-1.tar.gz # add new database name, new db_user and db_password into wp-config.php file nano wp-config.php # import database wp db import wp-db-yourfile321.sql # clean up temporary files rm my-website-all-1.tar.gz rm import wp-db-yourfile321.sq


Standard wordpress – replacing DB urls wp search-replace 'www.olddomain.com' 'www.newdomain.com' –all-tables –allow-roo

//HTTPS FORCE
$_SERVER['HTTPS'] = false;
//URLS
define('WP_SITEURL', 'http://'.$_SERVER['HTTP_HOST']);
define('WP_HOME',    'http://'.$_SERVER['HTTP_HOST']);

//Uploads Dir
//define('UPLOADS', 'public_wp_uploads');