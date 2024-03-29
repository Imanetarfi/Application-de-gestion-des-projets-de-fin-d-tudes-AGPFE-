
/*la creation du table enseignant*/

CREATE TABLE `gestion_projects`.`enseignant` (
  `idEns` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NULL,
  `prenom` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `pasword` VARCHAR(45) NULL,
  PRIMARY KEY (`idEns`));

/*la creation du table jury*/

CREATE TABLE `gestion_projects`.`jury` (
  `idJury` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NULL,
  `prenom` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`idJury`));

ALTER TABLE `gestion_projects`.`jury` 
ADD COLUMN `note` FLOAT NULL AFTER `email`;

/*la creation du table projet*/

  CREATE TABLE `gestion_projects`.`projet` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titre` VARCHAR(45) NULL,
  `file` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `mot-cle` MEDIUMTEXT NULL,
  `etat` VARCHAR(45) NULL,
  `jury-id` INT NULL,
  `enseignant-id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_projet_jury_idx` (`jury-id` ASC) VISIBLE,
  CONSTRAINT `fk_projet_jury`
    FOREIGN KEY (`jury-id`)
    REFERENCES `gestion_projects`.`jury` (`idJury`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `gestion_projects`.`projet` 
ADD INDEX `fk_projet_enseignant_idx` (`enseignant-id` ASC) VISIBLE;
;
ALTER TABLE `gestion_projects`.`projet` 
ADD CONSTRAINT `fk_projet_enseignant`
  FOREIGN KEY (`enseignant-id`)
  REFERENCES `gestion_projects`.`enseignant` (`idEns`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `gestion_projects`.`projet` 
ADD COLUMN `dateDebut` DATE NULL AFTER `enseignant-id`,
ADD COLUMN `dateFin` DATE NULL AFTER `dateDebut`;

/*la creation du table etudiant*/

CREATE TABLE `gestion_projects`.`etudiant` (
  `idEtud` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NULL,
  `prenom` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `spécialité` VARCHAR(45) NULL,
  `classement` INT NULL,
  `sujet-id` INT NULL,
  PRIMARY KEY (`idEtud`),
  INDEX `fk_etudiant_projet_idx` (`sujet-id` ASC) VISIBLE,
  CONSTRAINT `fk_etudiant_projet`
    FOREIGN KEY (`sujet-id`)
    REFERENCES `gestion_projects`.`projet` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

/*la creation du table binomes*/

CREATE TABLE `gestion_projects`.`binomes` (
  `idbinomes` INT NOT NULL AUTO_INCREMENT,
  `etudiant_id1` INT NULL,
  `etudiant_id2` INT NULL,
  PRIMARY KEY (`idbinomes`),
  INDEX `fk_binomes_etudiant_idx` (`etudiant_id1` ASC) VISIBLE,
  CONSTRAINT `fk_binomes_etudiant`
    FOREIGN KEY (`etudiant_id1`)
    REFERENCES `gestion_projects`.`etudiant` (`idEtud`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `gestion_projects`.`binomes` 
ADD INDEX `fk_binomes_etudiant_idx1` (`etudiant_id2` ASC) VISIBLE;

/*la creation du table version*/
CREATE TABLE `gestion_projects`.`version` (
  `idversion` INT NOT NULL AUTO_INCREMENT,
  `projet-id` INT NULL,
  `version-number` INT NULL,
  `file` VARCHAR(50) NULL,
  `created_at` DATE NULL,
  PRIMARY KEY (`idversion`),
  INDEX `fk_version_projet_idx` (`projet-id` ASC) VISIBLE,
  CONSTRAINT `fk_version_projet`
    FOREIGN KEY (`projet-id`)
    REFERENCES `gestion_projects`.`projet` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
