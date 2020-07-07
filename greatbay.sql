CREATE DATABASE greatbay_db;

USE greatbay_db;

CREATE TABLE auctions(
    id integer NOT NULL auto_increment,
    item varchar(50) NOT NULL,
    catergory varchar(50) NOT NULL,
    startingBid integer DEFAULT 0,
    highestBid integer DEFAULT 0,
    primary key (id)
);

