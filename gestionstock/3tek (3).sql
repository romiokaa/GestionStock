-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : jeu. 11 juil. 2024 à 13:09
-- Version du serveur : 8.0.30
-- Version de PHP : 8.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `3tek`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id_categorie` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id_categorie`, `name`) VALUES
(1, 'ordinateur'),
(2, 'smartphone'),
(3, 'imprimante'),
(4, 'Logiciels'),
(5, 'E-books'),
(6, 'Jeux vidéo');

-- --------------------------------------------------------

--
-- Structure de la table `lots`
--

CREATE TABLE `lots` (
  `idLots` int NOT NULL,
  `specialite` int DEFAULT NULL,
  `nom` varchar(350) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(250) NOT NULL,
  `description` varchar(600) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prix` int NOT NULL,
  `grade` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `lots`
--

INSERT INTO `lots` (`idLots`, `specialite`, `nom`, `image`, `description`, `prix`, `grade`) VALUES
(1, 9, 'ARCOTEC/FRANELEC-EQUIPEMENTS PERITEL', 'equipement.png', 'TELEPHONIE ET ELECTRIQUE SWITCH PERITEL 3 ENTRES MULTIPRISE PERITELDATE MEC :  -Multiprises péritels - téléphonie - Prolongateurs téléphonie microfiche', 30, 'A+'),
(2, 2, '3 UNITES CENTRALES OPTIFLEX', 'unitecentral.png', 'DELL -3 UNITES CENTRALES OPTIFLEX- KM : 0 (non certifié) - DATE MEC : - Windows 10 - Windows 7,Intel Core i3, 6100 CPU, Ram 4 go Uc 2 plusieurs port USB non fonctionnels\r\nClavier - souris et câbles non fournis', 50, 'B'),
(3, 2, 'Lots de 15 ordinateurs', 'lotOrdinateurs.png', 'lots de 15 ordinateurs ACER CB5 312T', 150, 'C'),
(4, 7, 'imprimante', 'imprimante.png', 'Combiné RICOH IMC 3000 VENDU SUR DESIGNATION - A RECUPERER A PERRIGNY (39570)Frais de vente\r\nCombiné RICOH IMC 3000', 1000, 'A+');

-- --------------------------------------------------------

--
-- Structure de la table `specialites`
--

CREATE TABLE `specialites` (
  `id_specialite` int NOT NULL,
  `nom_specialite` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `specialites`
--

INSERT INTO `specialites` (`id_specialite`, `nom_specialite`) VALUES
(1, 'reseaux'),
(2, 'Informatique general'),
(3, 'stockage_donnees'),
(4, 'securité informatique'),
(5, 'Réalité virtuelle et augmentée'),
(6, 'audio/video'),
(7, 'Impression/numerisation'),
(8, 'développement et programmation'),
(9, 'telecommunication'),
(10, 'domotique');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `nom_entreprise` varchar(250) NOT NULL,
  `specialite_id` int NOT NULL,
  `civilite` enum('f','h') NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `pseudo` varchar(50) NOT NULL,
  `tel` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `codePostale` varchar(50) NOT NULL,
  `pays` varchar(50) NOT NULL,
  `role` enum('ROLE_USER','ROLE_ADMIN') DEFAULT 'ROLE_USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_categorie`);

--
-- Index pour la table `lots`
--
ALTER TABLE `lots`
  ADD PRIMARY KEY (`idLots`),
  ADD KEY `specialite` (`specialite`);

--
-- Index pour la table `specialites`
--
ALTER TABLE `specialites`
  ADD PRIMARY KEY (`id_specialite`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `specialite_id` (`specialite_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_categorie` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `specialites`
--
ALTER TABLE `specialites`
  MODIFY `id_specialite` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `lots`
--
ALTER TABLE `lots`
  ADD CONSTRAINT `lots_ibfk_1` FOREIGN KEY (`specialite`) REFERENCES `specialites` (`id_specialite`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`specialite_id`) REFERENCES `specialites` (`id_specialite`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
