-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 09 mars 2026 à 01:31
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `garage`
--

-- --------------------------------------------------------

--
-- Structure de la table `garages`
--

CREATE TABLE `garages` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `adresse` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `garages`
--

INSERT INTO `garages` (`id`, `nom`, `description`, `adresse`) VALUES
(1, 'Auto Service Express', 'Vidange, freinage, pneumatiques et préparation au contrôle technique.', '8 Boulevard National, 13003 Marseille'),
(2, 'Mécanique Pro Garage', 'Moteur, boîte de vitesse, embrayage et réparations lourdes.', '22 Rue Victor Hugo, 31000 Toulouse'),
(7, 'Garage Central', 'Garage spécialisé dans les réparations rapides', '12 Rue de Paris, 75001 Paris'),
(8, 'Auto Service Lyon', 'Entretien et réparation toutes marques', '45 Avenue Jean Jaurès, 69007 Lyon'),
(9, 'Garage du Port', 'Spécialiste véhicules utilitaires', '8 Quai du Port, 13002 Marseille'),
(10, 'Meca Auto', 'Garage moderne avec diagnostic électronique', '22 Boulevard Victor Hugo, 06000 Nice'),
(12, 'Super-car', 'Garage Automobile', '1234 Rue des Voitures, Ville, Code Postal');

-- --------------------------------------------------------

--
-- Structure de la table `voiture`
--

CREATE TABLE `voiture` (
  `id` int(11) NOT NULL,
  `modele` varchar(255) NOT NULL,
  `couleur` varchar(255) NOT NULL,
  `garage` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `voiture`
--

INSERT INTO `voiture` (`id`, `modele`, `couleur`, `garage`) VALUES
(43, 'BMW Série 3', 'Noir', 12),
(44, 'Audi A4', 'Blanc', NULL),
(45, 'Mercedes Classe C', 'Gris', 2),
(46, 'Volkswagen Golf', 'Bleu', 2),
(47, 'Toyota Yaris', 'Blanc', 1),
(48, 'Ford Focus', 'Noir', 2),
(49, 'Tesla Model 3', 'Rouge', 1),
(50, 'Dacia Sandero', 'Jaune', 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `garages`
--
ALTER TABLE `garages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `voiture`
--
ALTER TABLE `voiture`
  ADD PRIMARY KEY (`id`),
  ADD KEY `garage_id` (`garage`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `garages`
--
ALTER TABLE `garages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `voiture`
--
ALTER TABLE `voiture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `voiture`
--
ALTER TABLE `voiture`
  ADD CONSTRAINT `garage_id` FOREIGN KEY (`garage`) REFERENCES `garages` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
