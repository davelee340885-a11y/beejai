CREATE TABLE `admission_info` (
	`id` int AUTO_INCREMENT NOT NULL,
	`schoolId` int NOT NULL,
	`academicYear` varchar(20) NOT NULL,
	`applicationOpenDate` timestamp,
	`applicationDeadline` timestamp,
	`interviewDate` timestamp,
	`resultDate` timestamp,
	`requirements` text,
	`documents` text,
	`interviewInfo` text,
	`intake` int,
	`applicants` int,
	`contactPerson` varchar(100),
	`contactPhone` varchar(50),
	`contactEmail` varchar(255),
	`sourceUrl` varchar(500),
	`isVerified` boolean DEFAULT false,
	`lastScrapedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `admission_info_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`schoolId` int NOT NULL,
	`childId` int,
	`status` enum('planning','applied','interview','waitlist','accepted','rejected','enrolled') DEFAULT 'planning',
	`applicationDate` timestamp,
	`interviewDate` timestamp,
	`resultDate` timestamp,
	`notes` text,
	`documents` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `children` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`birthDate` timestamp,
	`gender` enum('male','female'),
	`currentSchool` varchar(255),
	`currentGrade` varchar(50),
	`targetLevel` enum('kindergarten','primary','secondary'),
	`interests` text,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `children_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`schoolId` int NOT NULL,
	`childId` int,
	`priority` int DEFAULT 0,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notification_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`emailNotifications` boolean DEFAULT true,
	`deadlineReminders` boolean DEFAULT true,
	`reminderDaysBefore` int DEFAULT 7,
	`newInfoAlerts` boolean DEFAULT true,
	`weeklyDigest` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notification_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `notification_settings_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `schools` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`nameEn` varchar(255),
	`type` enum('kindergarten','primary','secondary','international') NOT NULL,
	`district` varchar(50) NOT NULL,
	`address` text,
	`phone` varchar(50),
	`fax` varchar(50),
	`email` varchar(255),
	`website` varchar(500),
	`imageUrl` varchar(500),
	`category` enum('government','aided','dss','private','international'),
	`gender` enum('coed','boys','girls'),
	`religion` varchar(100),
	`language` enum('chinese','english','bilingual'),
	`curriculum` varchar(255),
	`band` enum('1','2','3'),
	`schoolNet` varchar(10),
	`linkedSchool` varchar(255),
	`tuitionFeeMin` int,
	`tuitionFeeMax` int,
	`studentCount` int,
	`teacherCount` int,
	`classCount` int,
	`foundedYear` int,
	`description` text,
	`features` text,
	`ranking` int,
	`rating` decimal(2,1),
	`isVerified` boolean DEFAULT false,
	`isPopular` boolean DEFAULT false,
	`viewCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `schools_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`plan` enum('free','basic','premium') NOT NULL DEFAULT 'free',
	`status` enum('active','cancelled','expired') NOT NULL DEFAULT 'active',
	`startDate` timestamp NOT NULL DEFAULT (now()),
	`endDate` timestamp,
	`stripeCustomerId` varchar(255),
	`stripeSubscriptionId` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
