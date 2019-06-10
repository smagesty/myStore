DROP DATABASE IF EXISTS myStoreDB;
CREATE database myStoreDB;
USE myStoreDB;
CREATE TABLE products (
 id INT NOT NULL auto_increment,
 product_name VARCHAR(100) NULL,
 department_name VARCHAR(100) NULL,
 price DECIMAL(10,4) NULL,
 stock_quantity int NULL,
 PRIMARY KEY (id)
);
SELECT * FROM products;