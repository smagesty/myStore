DROP DATABASE IF EXISTS myStoreDB;
CREATE database myStoreDB;
USE myStoreDB;
CREATE TABLE products (
 id INT NOT NULL auto_increment,
 product_name VARCHAR(100) NULL,
 department_name VARCHAR(100) NULL,
 price int NULL,
 stock_quantity int NULL,
 PRIMARY KEY (id)
);

Insert into products (product_name, department_name, price, stock_quantity)
values ("yeezy1", "sneakers", 100, 10),
("yeezy2", "sneakers", 200, 20),
("yeezy3", "sneakers", 300, 30),
("yeezy4", "sneakers", 400, 40),
("yeezy5", "sneakers", 500, 50),
("yeezy6", "sneakers", 600, 60),
("yeezy7", "sneakers", 700, 70),
("yeezy8", "sneakers", 800, 80),
("yeezy9", "sneakers", 900, 90),
("yeezy10", "sneakers", 1000, 100);

SELECT * FROM products;