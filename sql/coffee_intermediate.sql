-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 16 Bulan Mei 2022 pada 05.23
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coffee_intermediate`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(3) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Favorite Product', '2021-12-01 12:19:56', NULL),
(2, 'coffee', '2021-12-01 12:28:10', NULL),
(3, 'non coffee', '2021-12-01 12:28:21', NULL),
(4, 'foods', '2021-12-01 12:28:29', NULL),
(5, 'add on', '2021-12-01 12:28:42', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `items`
--

CREATE TABLE `items` (
  `id` int(3) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(100) NOT NULL,
  `category_id` int(3) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `items`
--

INSERT INTO `items` (`id`, `picture`, `name`, `price`, `category_id`, `created_at`, `updated_at`) VALUES
(5, '/uploads/1651582753550.jpg', 'Teh Hijau Bu Susi', 10000, 2, '2021-11-20 11:34:01', '2022-05-03 12:59:13'),
(7, '/uploads/1651582908992.jpeg', 'Teh Kelok Kajai', 15000, 3, '2021-11-20 11:35:40', '2022-05-03 13:01:49'),
(12, '/uploads/1651583272747.jpg', 'Kopi Sanger aceh', 20000, 2, '2021-12-30 20:27:21', '2022-05-03 13:07:52'),
(13, '/uploads/1651583303460.jpg', 'Kopi sidikalang', 18000, 2, '2021-12-30 20:27:21', '2022-05-03 13:08:23'),
(14, '/uploads/1651624314601.jpg', 'Kopi Jahe Padang', 18000, 2, '2021-12-30 20:27:21', '2022-05-04 00:31:54'),
(16, '/uploads/1651624157972.jpg', 'teh tarik', 12000, 3, '2021-12-30 20:29:36', '2022-05-04 00:29:17'),
(17, '/uploads/1651623980706.jpg', 'teh tubruk', 12000, 3, '2021-12-30 20:29:36', '2022-05-04 00:26:20'),
(18, '/uploads/1651623998957.jpg', 'wedang jahe', 10000, 3, '2021-12-30 20:29:36', '2022-05-04 00:26:38'),
(21, '/uploads/1651624024446.webp', 'pisang goreng', 12000, 4, '2022-01-01 21:27:00', '2022-05-04 00:27:04'),
(23, '/uploads/1651624056820.webp', 'indomie rebus', 10000, 4, '2022-01-01 21:27:00', '2022-05-04 00:27:36'),
(24, '/uploads/1651624105979.jpg', 'telor', 3000, 5, '2022-01-01 21:27:00', '2022-05-04 00:28:25'),
(25, '/uploads/1651624133159.jpg', 'Anggur Hitam', 15000, 4, '2022-01-01 21:27:00', '2022-05-04 00:28:53'),
(37, '/uploads/1651583383776.jpg', 'Vietnam Drip', 18000, 4, '2022-02-28 05:19:20', '2022-05-03 13:09:43'),
(38, '/uploads/1651583406687.jpeg', 'Arabian Coffee', 21000, 2, '2022-03-01 01:07:40', '2022-05-03 13:10:06'),
(39, '/uploads/1651622302598.jpeg', 'Kopi Tubruk Cengkeh', 17000, 2, '2022-04-13 07:32:53', '2022-05-03 23:58:22'),
(40, '/uploads/1651622328272.jpg', 'Americano', 17000, 2, '2022-04-13 07:33:34', '2022-05-03 23:58:48'),
(41, '/uploads/1651622352597.webp', 'Brown Sugar', 18000, 3, '2022-04-13 07:34:12', '2022-05-03 23:59:12'),
(42, '/uploads/1651622418963.jpeg', 'Latte', 19000, 3, '2022-04-13 07:34:33', '2022-05-04 00:00:18'),
(43, '/uploads/1651622443840.jpg', 'Mocha Coffee', 18000, 2, '2022-04-13 07:35:04', '2022-05-04 00:00:43'),
(44, '/uploads/1651622494718.jpg', 'Affogato', 21000, 2, '2022-04-13 07:36:18', '2022-05-04 00:01:34'),
(45, '/uploads/1651622535197.webp', 'Vanilla Coffee', 21000, 2, '2022-04-13 07:36:35', '2022-05-04 00:02:15'),
(46, '/uploads/1651622562582.jpeg', 'Rum Mocha Coffee', 22000, 2, '2022-04-13 07:36:56', '2022-05-04 00:02:42'),
(47, '/uploads/1651622588149.jpeg', 'Caramel Coffee', 19000, 2, '2022-04-13 07:37:24', '2022-05-04 00:03:08'),
(48, '/uploads/1651622613746.jpeg', 'Ginger Latte', 21000, 3, '2022-04-13 07:38:23', '2022-05-04 00:03:33');

-- --------------------------------------------------------

--
-- Struktur dari tabel `items_transactions`
--

CREATE TABLE `items_transactions` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(10) NOT NULL,
  `variants` varchar(100) DEFAULT NULL,
  `amount` int(10) NOT NULL,
  `id_item` int(10) NOT NULL,
  `id_transaction` int(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `items_transactions`
--

INSERT INTO `items_transactions` (`id`, `name`, `price`, `variants`, `amount`, `id_item`, `id_transaction`, `created_at`, `updated_at`) VALUES
(1, 'Teh Hijau Bu Susi', 10000, NULL, 10, 5, 6, '2022-05-16 03:18:07', '0000-00-00 00:00:00'),
(2, 'Kopi Sanger aceh', 20000, NULL, 1, 12, 6, '2022-05-16 03:18:07', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(3) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(100) NOT NULL,
  `description` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `delivery_on` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `quantity`, `delivery_on`, `created_at`, `updated_at`) VALUES
(33, 'Arabika Sidomukti', 21000, 'Kopi Arabika lamak bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 09:48:32', '2021-12-06 11:09:45'),
(34, 'Honey Arabika Gayo', 25000, 'Lamak bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:33:48', '2021-12-06 11:09:45'),
(35, 'Natural Java Robusta', 30000, 'Lamak bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:34:24', '2021-12-06 11:09:45'),
(36, 'Luak Liar Aceh Gayo', 70000, 'Lamak bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:35:00', '2021-12-06 11:09:45'),
(37, 'Kopi Jahe', 18000, 'Lamak bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:35:26', '2021-12-06 11:09:45'),
(38, 'Kopi Susu', 18000, 'Lamak Bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:36:04', '2021-12-06 11:09:45'),
(39, 'Choco Latte', 20000, 'Lamak Bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:37:40', '2021-12-06 11:09:45'),
(40, 'Macha Green Latte', 27000, 'Lamak Bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:38:29', '2021-12-06 11:09:45'),
(41, 'Nasi Goreng Special', 45000, 'Lamak Bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:39:38', '2021-12-06 11:09:45'),
(42, 'Bakmi Goreng Seafood', 45000, 'Lamak Bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:40:05', '2021-12-06 11:09:45'),
(43, 'Paket Sup Iga', 45000, '75000', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:40:43', '2021-12-06 11:09:45'),
(44, 'Nasi Goreng Seafood', 30000, 'Lamak Bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:41:49', '2021-12-06 11:09:45'),
(45, 'Nasi Putih', 5000, 'Lamak Bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:42:10', '2021-12-06 11:09:45'),
(46, 'Telur', 5000, 'Lamak Bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:42:26', '2021-12-06 11:09:45'),
(47, 'Sambal', 5000, 'Lamak Bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:42:47', '2021-12-06 11:09:45'),
(48, 'Lalapna', 5000, 'Lamak Bana', 1000, 'Delivery only on Monday to friday at  1 - 7 pm', '2021-12-04 10:42:59', '2021-12-06 11:09:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_categories`
--

CREATE TABLE `product_categories` (
  `id` int(3) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product_categories`
--

INSERT INTO `product_categories` (`id`, `id_product`, `id_category`, `created_at`, `updated_at`) VALUES
(11, 32, 1, '2021-12-04 04:01:26', NULL),
(12, 32, 2, '2021-12-04 04:01:26', NULL),
(13, 33, 1, '2021-12-04 09:48:32', NULL),
(14, 33, 2, '2021-12-04 09:48:32', NULL),
(15, 34, 1, '2021-12-04 10:33:49', NULL),
(16, 34, 2, '2021-12-04 10:33:49', NULL),
(17, 35, 1, '2021-12-04 10:34:24', NULL),
(18, 35, 2, '2021-12-04 10:34:24', NULL),
(19, 36, 1, '2021-12-04 10:35:00', NULL),
(20, 36, 2, '2021-12-04 10:35:00', NULL),
(21, 37, 1, '2021-12-04 10:35:26', NULL),
(22, 37, 2, '2021-12-04 10:35:26', NULL),
(23, 38, 2, '2021-12-04 10:36:04', NULL),
(24, 39, 3, '2021-12-04 10:37:40', NULL),
(25, 40, 3, '2021-12-04 10:38:29', NULL),
(26, 41, 1, '2021-12-04 10:39:38', NULL),
(27, 41, 4, '2021-12-04 10:39:38', NULL),
(28, 42, 1, '2021-12-04 10:40:05', NULL),
(29, 42, 4, '2021-12-04 10:40:05', NULL),
(30, 43, 1, '2021-12-04 10:40:43', NULL),
(31, 43, 4, '2021-12-04 10:40:43', NULL),
(32, 44, 4, '2021-12-04 10:41:49', NULL),
(33, 45, 5, '2021-12-04 10:42:10', NULL),
(34, 46, 5, '2021-12-04 10:42:26', NULL),
(35, 47, 5, '2021-12-04 10:42:47', NULL),
(36, 48, 5, '2021-12-04 10:42:59', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_variants`
--

CREATE TABLE `product_variants` (
  `id` int(3) NOT NULL,
  `additional_price` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_variant` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product_variants`
--

INSERT INTO `product_variants` (`id`, `additional_price`, `id_product`, `id_variant`, `created_at`, `updated_at`) VALUES
(1, 0, 33, 1, '2021-12-05 00:09:28', NULL),
(2, 3000, 33, 2, '2021-12-05 00:09:28', NULL),
(3, 5000, 33, 3, '2021-12-05 00:09:28', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(10) NOT NULL,
  `code` varchar(80) NOT NULL,
  `total` int(10) NOT NULL,
  `tax` int(10) NOT NULL,
  `shipping_cost` int(10) DEFAULT NULL,
  `shipping_address` text DEFAULT NULL,
  `payment_method` varchar(100) NOT NULL,
  `id_user` int(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `code`, `total`, `tax`, `shipping_cost`, `shipping_address`, `payment_method`, `id_user`, `created_at`, `updated_at`) VALUES
(1, 'CS/1652022/1', 100000, 10000, 10000, 'Jalan Kegelapan Nomor 13, Kelurahan Antah Berantah', 'Bank', 26, '2022-05-16 02:59:51', NULL),
(2, 'CS/1652022/1', 135000, 13500, 10000, 'Jalan Kegelapan Nomor 13, Kelurahan Antah Berantah', 'Bank', 26, '2022-05-16 03:01:47', NULL),
(3, 'CS/1652022/1', 135000, 13500, 10000, 'Jalan Kegelapan Nomor 13, Kelurahan Antah Berantah', 'Bank', 26, '2022-05-16 03:06:10', NULL),
(4, 'CS/1652022/1', 135000, 13500, 10000, 'Jalan Kegelapan Nomor 13, Kelurahan Antah Berantah', 'Bank', 26, '2022-05-16 03:06:42', NULL),
(5, 'CS/1652022/1', 120000, 12000, 10000, 'Jalan Kegelapan Nomor 13, Kelurahan Antah Berantah', 'Bank', 26, '2022-05-16 03:16:24', NULL),
(6, 'CS/1652022/1', 120000, 12000, 10000, 'Jalan Kegelapan Nomor 13, Kelurahan Antah Berantah', 'Bank', 26, '2022-05-16 03:18:07', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(3) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user',
  `photo` varchar(200) DEFAULT NULL,
  `display_name` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `address` text DEFAULT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `gender` enum('Pria','Wanita') DEFAULT NULL,
  `birth` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `role`, `photo`, `display_name`, `email`, `password`, `mobile_number`, `address`, `first_name`, `last_name`, `gender`, `birth`, `created_at`, `updated_at`) VALUES
(7, 'user', NULL, 'Eka Fajhari Adwar', 'user7@gmail.com', '$2b$10$pODku92HXWkWV/XhfhkQcejPrMcjZswImk7F3hAeCyMvCHm6KUoBy', '082145456767', 'Jalan Paku Bumi Nomor 13, Papua Timur', 'Jill', 'Valentine', 'Wanita', '27 September 1996', '2022-02-21 03:11:04', NULL),
(8, 'user', '/images/1646729674239.jpg', 'Leon Kennedy', 'user8@gmail.com', '$2b$10$8O/VlzQrp6v922ZpxQh1GOfnmsDzjHpfvcLymN1/5Dljdc3lJ8qzi', '098765432123', NULL, 'Leon', 'Kennedy', 'Pria', '1 April 1990', '2022-02-21 03:11:43', '2022-03-08 08:54:34'),
(9, 'admin', '/uploads/1652328839096.jpg', 'Leon', 'adminadmiral@mail.com', '$2b$10$Y1DMWCeXd1HYWMe/yn9wo.ctf.dUCjRcKxM7po8xEYqb6B.BfrPna', '0821341267150', 'Jalan Palala Nomor 124, Kelurahan Padang Besi, Kota Padang, Sumatera Barat, Indonesia', 'Eka', 'Adwar', NULL, '30 Februari 1980', '2022-02-23 07:37:37', '2022-05-12 04:13:59'),
(10, 'user', NULL, 'user9', 'user9@mail.com', '$2b$10$jj0DD1lXrLs1zS455stGBeGRqp/DGxhxuorzGRD8Q4a/Y3YuawspO', '084455556666', NULL, NULL, NULL, NULL, NULL, '2022-02-23 15:10:42', NULL),
(11, 'user', NULL, 'user10', 'user10@mail.com', '$2b$10$BqBXYBGuhHS8USJZHmTNqeUp1zVn8boDE4F3/0D2I3L8Kr2BoYVg6', '085566667777', NULL, NULL, NULL, NULL, NULL, '2022-02-23 15:14:47', NULL),
(12, 'user', NULL, 'user11', 'user11@mail.com', '$2b$10$pz5aaLjH5Uv1tXOtFA0ykuOgppg42FAq4LCROTOHm2hn8HscHb9Fy', '086677778888', NULL, NULL, NULL, NULL, NULL, '2022-02-23 15:15:27', NULL),
(13, 'user', NULL, 'user12', 'user12@mail.com', '$2b$10$P9BqTKAXg2gVHWj3xM0F..WnBckKwEG5sHmdq/MpV77Vzn.k3YqnW', '087788889999', NULL, NULL, NULL, NULL, NULL, '2022-02-23 15:16:26', NULL),
(14, 'user', NULL, 'user13', 'user13@mail.com', '$2b$10$xOmFd889ohLVTXXC8tiFieUn6vfZqeYMBCYe5W.RwtTGhYh/C9y9W', '088899990000', NULL, NULL, NULL, NULL, NULL, '2022-02-23 15:18:10', NULL),
(15, 'user', NULL, 'user14', 'user14@mail.com', '$2b$10$ZKdkdMxc17LgyUM3s7wIyeifTe1q681kIa.Up7pco7ZF0fNJ.cLSK', '089900001111', NULL, NULL, NULL, NULL, NULL, '2022-02-23 23:05:20', NULL),
(16, 'user', NULL, 'user15', 'user15@mail.com', '$2b$10$NcidK/nFW6C5kbcqrSGgk.O.fZrGeLdSXuvBsKwwa0kkJQyCKEEOe', '089900002222', NULL, NULL, NULL, NULL, NULL, '2022-05-03 00:03:10', NULL),
(17, 'user', NULL, 'rivatndut', 'rivatndut@mail.com', '$2b$10$.mQWHnc7DHl8oq4gb7Zhj.kRGo55k.v4Vy2JqetgMusjV4nPIyAc2', '888888888888', NULL, NULL, NULL, NULL, NULL, '2022-05-03 00:57:21', NULL),
(18, 'user', NULL, 'rivargendut', 'rivargendut@gmail.com', '$2b$10$fTyt5Er7dgpZmlqXvZyUzuhb3fibsbjyi/003Wnvq8dhn30KZxxNK', '777777777777', NULL, NULL, NULL, NULL, NULL, '2022-05-03 01:06:49', NULL),
(19, 'user', NULL, 'rivatgembul', 'rivatgembul@gmail.com', '$2b$10$fgyk1klNdBsKjRdQdbcQbeFJNkEcu8F8Vzeu3CT2wXSZbCfm8b1oi', '777666555444', NULL, NULL, NULL, NULL, NULL, '2022-05-03 01:08:18', NULL),
(20, 'user', NULL, 'rivatbulet', 'rivatbulet@gmail.com', '$2b$10$I0NzwP12GnJcfTk9/4QqiuhYEmaX.Qu.iER7u.FCmaRS/qpArDtvm', '111222333444', NULL, NULL, NULL, NULL, NULL, '2022-05-03 01:09:29', NULL),
(21, 'user', NULL, 'arateknik', 'arateknik@ara.com', '$2b$10$8m2ySLfIqo0Yt6ZmSq9GT.3BlnKfvjaQgYr2bNoDjUd/k4xM7sVnW', '456732140987', NULL, NULL, NULL, NULL, NULL, '2022-05-03 01:11:50', NULL),
(22, 'user', NULL, 'anu', 'anu@gmail.com', '$2b$10$GgfRXpg0T4urgCIu96JjNOKgzWixWwRtbOKSbGb1QNzLGaYVIhNMW', '4567431287864532', NULL, NULL, NULL, NULL, NULL, '2022-05-03 01:12:52', NULL),
(23, 'user', NULL, 'anuanu', 'anuanu@gmail.com', '$2b$10$GwGUg97SJh/nQwfxNuHZvunCw3hh4gesWSl/JclHvy1zW2HC9x2s.', '765432120987', NULL, NULL, NULL, NULL, NULL, '2022-05-03 01:15:37', NULL),
(24, 'user', '/uploads/1652330253265.jpg', 'Bang Joss', 'userbaru@mail.com', '$2b$10$RqDWggAt8VUHbvXpAoIl3ullGUXW8KVFZC5X6zucpmFse7Xc29kIO', '999888777666', 'Jalan Kebenaran Nomor 13, Antah Berantah', 'Bang', 'Joss', NULL, NULL, '2022-05-12 04:34:43', '2022-05-12 04:38:36'),
(25, 'user', '/uploads/1652408635457.jpg', 'Leon Kennedy', 'userbaru1@mail.com', '$2b$10$JpwnboxsFKvaXklG2XdESeuFl0SJVWyezZDIlZ4rCJE00f5eJwqLG', '098745631234', 'Jalan Keberana Nomor 13, Antah Berantah', 'Leon', 'Kennedy', NULL, NULL, '2022-05-13 02:21:01', '2022-05-13 02:25:20'),
(26, 'user', '/uploads/1652447370015.jpg', 'Leon Kennedy', 'userbarusekali@mail.com', '$2b$10$KkXVxjzcF4wPf/vmDlWwH.2h9Mn3rUUwEKKab3IY3eMVBBQbtHBgy', '098712345432', 'Jalan Kegelapan Nomor 13, Kelurahan Antah Berantah', 'Leon', 'Kennedy', NULL, NULL, '2022-05-13 13:06:20', '2022-05-13 13:11:33');

-- --------------------------------------------------------

--
-- Struktur dari tabel `variants`
--

CREATE TABLE `variants` (
  `id` int(3) NOT NULL,
  `additional_price` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `variants`
--

INSERT INTO `variants` (`id`, `additional_price`, `name`, `code`, `created_at`, `updated_at`) VALUES
(1, 0, 'Regular', 'R', '2021-12-05 03:57:30', NULL),
(2, 3000, 'Large', 'L', '2021-12-05 03:58:50', NULL),
(3, 5000, 'Extra Large', 'XL', '2021-12-05 03:58:50', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `items_transactions`
--
ALTER TABLE `items_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `variants`
--
ALTER TABLE `variants`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `items`
--
ALTER TABLE `items`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT untuk tabel `items_transactions`
--
ALTER TABLE `items_transactions`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT untuk tabel `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT untuk tabel `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT untuk tabel `variants`
--
ALTER TABLE `variants`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
