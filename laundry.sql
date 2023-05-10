-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Bulan Mei 2023 pada 11.27
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laundry`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id_detail_transaksi` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL,
  `id_paket` int(11) NOT NULL,
  `qty` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `detail_transaksi`
--

INSERT INTO `detail_transaksi` (`id_detail_transaksi`, `id_transaksi`, `id_paket`, `qty`, `createdAt`, `updatedAt`) VALUES
(31, 84, 9, 2, '2022-04-08 06:00:05', '2022-04-08 06:00:05'),
(32, 84, 7, 3, '2022-04-08 06:00:05', '2022-04-08 06:00:05'),
(33, 84, 6, 1, '2022-04-08 06:00:05', '2022-04-08 06:00:05'),
(38, 86, 7, 12, '2022-04-08 07:41:01', '2022-04-08 07:41:01'),
(39, 87, 10, 2, '2022-04-08 07:52:47', '2022-04-08 07:52:47'),
(40, 87, 8, 3, '2022-04-08 07:52:47', '2022-04-08 07:52:47'),
(41, 87, 10, 2, '2022-04-08 07:52:47', '2022-04-08 07:52:47'),
(42, 88, 8, 2, '2022-04-08 07:55:15', '2022-04-08 07:55:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `member`
--

CREATE TABLE `member` (
  `id_member` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `jenis_kelamin` enum('L','P') DEFAULT NULL,
  `tlp` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `member`
--

INSERT INTO `member` (`id_member`, `nama`, `alamat`, `jenis_kelamin`, `tlp`, `createdAt`, `updatedAt`) VALUES
(5, 'Firda', 'Surabaya', 'P', 85784950, '2022-04-07 14:55:20', '2022-04-08 06:31:38'),
(6, 'Firman', 'Surabaya', 'L', 87651234, '2022-04-08 05:59:14', '2022-04-08 05:59:14'),
(9, 'Maulana', 'Surabaya', 'L', 81234567, '2022-04-08 06:32:33', '2022-04-08 06:32:33'),
(14, 'Naufal', 'Gresik', 'L', 857898112, '2022-04-08 07:51:28', '2022-04-08 07:51:28'),
(15, 'Yusqi', 'Kediri', 'P', 89123567, '2022-04-08 07:54:16', '2022-04-08 07:54:16');

-- --------------------------------------------------------

--
-- Struktur dari tabel `outlet`
--

CREATE TABLE `outlet` (
  `id_outlet` int(11) NOT NULL,
  `tempat` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `outlet`
--

INSERT INTO `outlet` (`id_outlet`, `tempat`, `alamat`, `id_user`, `createdAt`, `updatedAt`) VALUES
(17, 'Greg Laundry', 'Malang', 5, '2022-03-27 09:05:49', '2022-04-07 15:00:36'),
(63, 'Lean Laundry', 'Gresik', 5, '2022-04-08 05:58:34', '2022-04-08 05:58:34'),
(64, 'Laundry', 'Blitar', 5, '2022-04-08 07:48:21', '2022-04-08 07:48:21'),
(65, 'Laundry Baru', 'Malang', 5, '2022-04-08 07:49:57', '2022-04-08 07:49:57');

-- --------------------------------------------------------

--
-- Struktur dari tabel `paket`
--

CREATE TABLE `paket` (
  `id_paket` int(11) NOT NULL,
  `nama_paket` varchar(255) DEFAULT NULL,
  `jenis` enum('Kiloan','Satuan') DEFAULT NULL,
  `harga` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `paket`
--

INSERT INTO `paket` (`id_paket`, `nama_paket`, `jenis`, `harga`, `createdAt`, `updatedAt`) VALUES
(6, 'Selimut', 'Kiloan', 12000, '2022-04-07 15:03:40', '2022-04-07 15:03:40'),
(7, 'Seragam', 'Kiloan', 30000, '2022-04-07 15:04:30', '2022-04-07 15:04:30'),
(8, 'Celana Jeans', 'Satuan', 10000, '2022-04-07 15:05:08', '2022-04-07 15:05:08'),
(9, 'Jas', 'Satuan', 30000, '2022-04-08 05:58:55', '2022-04-08 05:58:55'),
(10, 'Celana', 'Kiloan', 20000, '2022-04-08 07:50:48', '2022-04-08 07:50:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20211118015113-create-member.js'),
('20211118015727-create-paket.js'),
('20211201055912-create-user.js'),
('20220325020828-create-outlet.js'),
('20220325021355-create-transaksi.js'),
('20220325021920-create-detail-transaksi.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `id_member` int(11) NOT NULL,
  `tgl` datetime DEFAULT NULL,
  `batas_waktu` datetime DEFAULT NULL,
  `tgl_bayar` datetime DEFAULT NULL,
  `status` enum('baru','proses','selesai','diambil') DEFAULT NULL,
  `dibayar` enum('dibayar','belum_dibayar') DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `id_outlet` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_member`, `tgl`, `batas_waktu`, `tgl_bayar`, `status`, `dibayar`, `id_user`, `id_outlet`, `createdAt`, `updatedAt`) VALUES
(84, 5, '2022-04-08 06:00:05', '2022-04-30 00:00:00', '2022-04-08 00:00:00', 'diambil', 'dibayar', 1, 17, '2022-04-08 06:00:05', '2022-04-08 06:00:45'),
(86, 5, '2022-04-08 07:41:01', NULL, '2022-04-16 00:00:00', 'diambil', 'dibayar', 1, 63, '2022-04-08 07:41:01', '2022-04-08 07:41:51'),
(87, 9, '2022-04-08 07:52:47', '2022-04-30 00:00:00', '2022-04-30 00:00:00', 'diambil', 'dibayar', 1, 64, '2022-04-08 07:52:47', '2022-04-08 07:53:23'),
(88, 9, '2022-04-08 07:55:15', '2022-04-23 00:00:00', '0000-00-00 00:00:00', 'baru', 'belum_dibayar', 8, 17, '2022-04-08 07:55:15', '2022-04-08 07:55:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `role` enum('Admin','Kasir','Owner') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `username`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin@gmail.com', '21232f297a57a5a743894a0e4a801fc3', 'Admin', '2022-03-25 09:27:08', '2022-04-07 15:00:02'),
(5, 'Firman', 'owner@gmail.com', '72122ce96bfec66e2396d2e25225d70a', 'Owner', '2022-03-27 08:34:00', '2022-04-07 14:59:50'),
(8, 'kasir', 'kasir@gmail.com', 'c7911af3adbd12a035b289556d96470a', 'Kasir', '2022-04-08 05:58:15', '2022-04-08 05:58:15'),
(9, 'ferdi', 'ferdi@gmail.com', '8bf4bb0e2efad01abe522bf314504a49', 'Admin', '2022-04-08 07:48:05', '2022-04-08 07:48:05'),
(10, 'owner2', 'owner@owner.net', '72122ce96bfec66e2396d2e25225d70a', 'Owner', '2022-04-08 07:49:38', '2022-04-08 07:49:38');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id_detail_transaksi`),
  ADD KEY `id_transaksi` (`id_transaksi`),
  ADD KEY `id_paket` (`id_paket`);

--
-- Indeks untuk tabel `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id_member`);

--
-- Indeks untuk tabel `outlet`
--
ALTER TABLE `outlet`
  ADD PRIMARY KEY (`id_outlet`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `paket`
--
ALTER TABLE `paket`
  ADD PRIMARY KEY (`id_paket`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_member` (`id_member`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_outlet` (`id_outlet`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id_detail_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT untuk tabel `member`
--
ALTER TABLE `member`
  MODIFY `id_member` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `outlet`
--
ALTER TABLE `outlet`
  MODIFY `id_outlet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT untuk tabel `paket`
--
ALTER TABLE `paket`
  MODIFY `id_paket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `detail_transaksi_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`),
  ADD CONSTRAINT `detail_transaksi_ibfk_2` FOREIGN KEY (`id_paket`) REFERENCES `paket` (`id_paket`);

--
-- Ketidakleluasaan untuk tabel `outlet`
--
ALTER TABLE `outlet`
  ADD CONSTRAINT `outlet_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_member`) REFERENCES `member` (`id_member`),
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `transaksi_ibfk_3` FOREIGN KEY (`id_outlet`) REFERENCES `outlet` (`id_outlet`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
