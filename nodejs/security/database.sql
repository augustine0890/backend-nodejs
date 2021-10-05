SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema security
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema security
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `security` DEFAULT CHARACTER SET utf8;
USE `security`;

-- -----------------------------------------------------
-- Table `security`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `security`.`User` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(256) NOT NULL,
  `PasswordHash` LONGTEXT NOT NULL,
  `Salt` LONGTEXT NOT NULL,
  `Email` VARCHAR(256) NOT NULL,
  `EmailConfirmed` TINYINT(1) NOT NULL DEFAULT 0,
  `MobilePhone` LONGTEXT NULL,
  `MobilePhoneConfirmed` TINYINT(1) NOT NULL DEFAULT 0,
  `TwoFactorEnabled` TINYINT(1) NOT NULL DEFAULT 0,
  `AccessFailedCount` INT NOT NULL DEFAULT 0,
  `LockoutEnd` DATETIME NULL,
  `LockoutEnabled` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `security`.`Profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `security`.`Profile` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `FullName` VARCHAR(256) NOT NULL,
  `LastAccess` DATETIME NOT NULL,
  `User_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Profile_User_idx` (`User_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Profile_User`
    FOREIGN KEY (`User_Id`)
    REFERENCES `security`.`User` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `security`.`Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `security`.`Role` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `RoleName` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `security`.`UserRoles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `security`.`UserRoles` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `User_Id` INT NOT NULL,
  `Role_Id` INT NOT NULL,
  PRIMARY KEY (`Id`, `User_Id`, `Role_Id`),
  INDEX `fk_UserRoles_User1_idx` (`User_Id` ASC) VISIBLE,
  INDEX `fk_UserRoles_Role1_idx` (`Role_Id` ASC) VISIBLE,
  CONSTRAINT `fk_UserRoles_User1`
    FOREIGN KEY (`User_Id`)
    REFERENCES `security`.`User` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UserRoles_Role1`
    FOREIGN KEY (`Role_Id`)
    REFERENCES `security`.`Role` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
