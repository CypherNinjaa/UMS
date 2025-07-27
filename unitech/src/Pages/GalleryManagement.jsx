import React, { useState } from "react";
import {
	Row,
	Col,
	Card,
	Button,
	Form,
	InputGroup,
	Modal,
	Image,
	Badge,
	Dropdown,
	Tab,
	Tabs,
	ProgressBar,
} from "react-bootstrap";
import {
	FaPlus,
	FaSearch,
	FaEdit,
	FaTrash,
	FaEye,
	FaDownload,
	FaUpload,
	FaImages,
	FaFolder,
	FaFilter,
	FaSort,
	FaList,
	FaTh,
	FaHeart,
	FaShare,
	FaCalendarAlt,
	FaUser,
	FaTag,
	FaFileImage,
	FaExpand,
	FaCloudUploadAlt,
} from "react-icons/fa";
import AdminLayout from "../Components/Admin/Layout/AdminLayout";

const GalleryManagement = () => {
	// Sample gallery data
	const [galleryItems, setGalleryItems] = useState([
		{
			id: 1,
			title: "Convocation Ceremony 2024",
			description: "Highlights from the annual convocation ceremony",
			category: "Events",
			album: "Convocation 2024",
			fileName: "convocation_main.jpg",
			fileSize: "2.5 MB",
			dimensions: "1920x1080",
			uploadDate: "2024-12-01",
			uploadedBy: "Admin",
			tags: ["convocation", "graduation", "ceremony", "2024"],
			views: 450,
			downloads: 23,
			featured: true,
			isPublic: true,
			thumbnail: "/placeholder-image.jpg",
		},
		{
			id: 2,
			title: "New Research Lab",
			description: "Modern facilities in the AI research laboratory",
			category: "Facilities",
			album: "Campus Facilities",
			fileName: "research_lab_01.jpg",
			fileSize: "3.1 MB",
			dimensions: "2560x1440",
			uploadDate: "2024-11-28",
			uploadedBy: "Dr. Chen",
			tags: ["research", "laboratory", "AI", "facilities"],
			views: 234,
			downloads: 15,
			featured: false,
			isPublic: true,
			thumbnail: "/placeholder-image.jpg",
		},
		{
			id: 3,
			title: "Student Tech Conference",
			description: "Students presenting their innovative projects",
			category: "Academic",
			album: "Tech Conference 2024",
			fileName: "tech_conf_presentation.jpg",
			fileSize: "1.8 MB",
			dimensions: "1920x1280",
			uploadDate: "2024-11-15",
			uploadedBy: "Prof. Rodriguez",
			tags: ["technology", "conference", "students", "innovation"],
			views: 567,
			downloads: 34,
			featured: true,
			isPublic: true,
			thumbnail: "/placeholder-image.jpg",
		},
		{
			id: 4,
			title: "Campus Garden Spring 2024",
			description: "Beautiful spring blooms around the campus",
			category: "Campus Life",
			album: "Campus Nature",
			fileName: "spring_garden.jpg",
			fileSize: "4.2 MB",
			dimensions: "3840x2160",
			uploadDate: "2024-04-15",
			uploadedBy: "Marketing Team",
			tags: ["spring", "garden", "campus", "nature", "flowers"],
			views: 789,
			downloads: 67,
			featured: false,
			isPublic: true,
			thumbnail: "/placeholder-image.jpg",
		},
		{
			id: 5,
			title: "Library Study Areas",
			description: "Modern study spaces for collaborative learning",
			category: "Facilities",
			album: "Library",
			fileName: "library_study_area.jpg",
			fileSize: "2.9 MB",
			dimensions: "2048x1536",
			uploadDate: "2024-10-20",
			uploadedBy: "Library Staff",
			tags: ["library", "study", "students", "learning"],
			views: 345,
			downloads: 19,
			featured: false,
			isPublic: true,
			thumbnail: "/placeholder-image.jpg",
		},
		{
			id: 6,
			title: "Sports Tournament Finals",
			description: "Exciting moments from the inter-college sports tournament",
			category: "Sports",
			album: "Sports 2024",
			fileName: "sports_tournament.jpg",
			fileSize: "3.5 MB",
			dimensions: "2560x1920",
			uploadDate: "2024-09-30",
			uploadedBy: "Sports Department",
			tags: ["sports", "tournament", "competition", "athletics"],
			views: 623,
			downloads: 41,
			featured: true,
			isPublic: true,
			thumbnail: "/placeholder-image.jpg",
		},
		{
			id: 7,
			title: "Faculty Meeting October",
			description: "Monthly faculty meeting and planning session",
			category: "Administrative",
			album: "Faculty Meetings",
			fileName: "faculty_meeting_oct.jpg",
			fileSize: "1.6 MB",
			dimensions: "1600x1200",
			uploadDate: "2024-10-05",
			uploadedBy: "HR Department",
			tags: ["faculty", "meeting", "planning", "administration"],
			views: 89,
			downloads: 5,
			featured: false,
			isPublic: false,
			thumbnail: "/placeholder-image.jpg",
		},
		{
			id: 8,
			title: "Art Exhibition Opening",
			description: "Student artwork displayed in the campus gallery",
			category: "Arts",
			album: "Student Art 2024",
			fileName: "art_exhibition.jpg",
			fileSize: "2.7 MB",
			dimensions: "1920x1440",
			uploadDate: "2024-11-10",
			uploadedBy: "Arts Department",
			tags: ["art", "exhibition", "students", "creativity"],
			views: 456,
			downloads: 28,
			featured: false,
			isPublic: true,
			thumbnail: "/placeholder-image.jpg",
		},
	]);

	const [albums] = useState([
		{
			id: 1,
			name: "Convocation 2024",
			itemCount: 15,
			coverImage: "/placeholder-image.jpg",
			isPublic: true,
		},
		{
			id: 2,
			name: "Campus Facilities",
			itemCount: 28,
			coverImage: "/placeholder-image.jpg",
			isPublic: true,
		},
		{
			id: 3,
			name: "Tech Conference 2024",
			itemCount: 42,
			coverImage: "/placeholder-image.jpg",
			isPublic: true,
		},
		{
			id: 4,
			name: "Campus Nature",
			itemCount: 67,
			coverImage: "/placeholder-image.jpg",
			isPublic: true,
		},
		{
			id: 5,
			name: "Library",
			itemCount: 12,
			coverImage: "/placeholder-image.jpg",
			isPublic: true,
		},
		{
			id: 6,
			name: "Sports 2024",
			itemCount: 89,
			coverImage: "/placeholder-image.jpg",
			isPublic: true,
		},
		{
			id: 7,
			name: "Faculty Meetings",
			itemCount: 8,
			coverImage: "/placeholder-image.jpg",
			isPublic: false,
		},
		{
			id: 8,
			name: "Student Art 2024",
			itemCount: 23,
			coverImage: "/placeholder-image.jpg",
			isPublic: true,
		},
	]);

	const [viewMode, setViewMode] = useState("grid"); // grid, list, masonry
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedAlbum, setSelectedAlbum] = useState("All");
	const [sortBy, setSortBy] = useState("newest");
	const [activeTab, setActiveTab] = useState("images");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [showAlbumModal, setShowAlbumModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedImages, setSelectedImages] = useState([]);
	const [uploadProgress] = useState(0);

	// Get unique values for filters
	const categories = [
		"All",
		...new Set(galleryItems.map((item) => item.category)),
	];
	const albumNames = [
		"All",
		...new Set(galleryItems.map((item) => item.album)),
	];

	// Filter and sort gallery items
	const filteredItems = galleryItems
		.filter((item) => {
			const matchesSearch =
				item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.tags.some((tag) =>
					tag.toLowerCase().includes(searchTerm.toLowerCase())
				);
			const matchesCategory =
				selectedCategory === "All" || item.category === selectedCategory;
			const matchesAlbum =
				selectedAlbum === "All" || item.album === selectedAlbum;

			return matchesSearch && matchesCategory && matchesAlbum;
		})
		.sort((a, b) => {
			switch (sortBy) {
				case "newest":
					return new Date(b.uploadDate) - new Date(a.uploadDate);
				case "oldest":
					return new Date(a.uploadDate) - new Date(b.uploadDate);
				case "mostViewed":
					return b.views - a.views;
				case "title":
					return a.title.localeCompare(b.title);
				default:
					return 0;
			}
		});

	const handleDelete = (item) => {
		setSelectedItem(item);
		setShowDeleteModal(true);
	};

	const handleViewDetails = (item) => {
		setSelectedItem(item);
		setShowDetailsModal(true);
	};

	const confirmDelete = () => {
		if (selectedImages.length > 0) {
			setGalleryItems(
				galleryItems.filter((item) => !selectedImages.includes(item.id))
			);
			setSelectedImages([]);
		} else {
			setGalleryItems(
				galleryItems.filter((item) => item.id !== selectedItem.id)
			);
		}
		setShowDeleteModal(false);
		setSelectedItem(null);
	};

	const toggleImageSelection = (id) => {
		setSelectedImages((prev) =>
			prev.includes(id)
				? prev.filter((imageId) => imageId !== id)
				: [...prev, id]
		);
	};

	const handleBulkDelete = () => {
		if (selectedImages.length > 0) {
			setShowDeleteModal(true);
		}
	};

	// const formatFileSize = (bytes) => {
	// 	if (bytes === 0) return "0 Bytes";
	// 	const k = 1024;
	// 	const sizes = ["Bytes", "KB", "MB", "GB"];
	// 	const i = Math.floor(Math.log(bytes) / Math.log(k));
	// 	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	// };

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString();
	};

	// Calculate statistics
	const totalImages = galleryItems.length;
	const totalViews = galleryItems.reduce((sum, item) => sum + item.views, 0);
	const totalDownloads = galleryItems.reduce(
		(sum, item) => sum + item.downloads,
		0
	);
	// const featuredImages = galleryItems.filter((item) => item.featured).length;

	const renderGridView = () => (
		<Row>
			{filteredItems.map((item) => (
				<Col key={item.id} xl={3} lg={4} md={6} className="mb-4">
					<Card
						className={`gallery-item ${
							selectedImages.includes(item.id) ? "selected" : ""
						}`}
					>
						<div className="image-container position-relative">
							<Image
								src={item.thumbnail}
								alt={item.title}
								className="gallery-thumbnail w-100"
								style={{ height: "200px", objectFit: "cover" }}
							/>
							<div className="image-overlay">
								<div className="overlay-actions">
									<Button
										variant="light"
										size="sm"
										onClick={() => handleViewDetails(item)}
									>
										<FaEye />
									</Button>
									<Button variant="light" size="sm" className="ms-2">
										<FaDownload />
									</Button>
								</div>
								<Form.Check
									type="checkbox"
									className="position-absolute top-0 end-0 m-2"
									checked={selectedImages.includes(item.id)}
									onChange={() => toggleImageSelection(item.id)}
								/>
							</div>
							{item.featured && (
								<Badge
									bg="warning"
									className="position-absolute top-0 start-0 m-2"
								>
									Featured
								</Badge>
							)}
							{!item.isPublic && (
								<Badge
									bg="secondary"
									className="position-absolute top-0 start-0 m-2 mt-5"
								>
									Private
								</Badge>
							)}
						</div>
						<Card.Body>
							<h6 className="card-title">{item.title}</h6>
							<p className="card-text small text-muted">
								{item.description.substring(0, 80)}...
							</p>
							<div className="d-flex justify-content-between align-items-center">
								<small className="text-muted">
									<FaEye className="me-1" />
									{item.views}
								</small>
								<Dropdown>
									<Dropdown.Toggle variant="outline-secondary" size="sm">
										Actions
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item onClick={() => handleViewDetails(item)}>
											<FaEye className="me-2" />
											View Details
										</Dropdown.Item>
										<Dropdown.Item>
											<FaEdit className="me-2" />
											Edit
										</Dropdown.Item>
										<Dropdown.Item>
											<FaDownload className="me-2" />
											Download
										</Dropdown.Item>
										<Dropdown.Divider />
										<Dropdown.Item
											className="text-danger"
											onClick={() => handleDelete(item)}
										>
											<FaTrash className="me-2" />
											Delete
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);

	const renderListView = () => (
		<div className="list-view">
			{filteredItems.map((item) => (
				<Card
					key={item.id}
					className={`mb-3 gallery-item ${
						selectedImages.includes(item.id) ? "selected" : ""
					}`}
				>
					<Card.Body>
						<Row className="align-items-center">
							<Col md={2}>
								<Image
									src={item.thumbnail}
									alt={item.title}
									className="w-100"
									style={{ height: "80px", objectFit: "cover" }}
								/>
							</Col>
							<Col md={6}>
								<h6 className="mb-1">{item.title}</h6>
								<p className="text-muted mb-1">{item.description}</p>
								<div>
									<Badge bg="secondary" className="me-2">
										{item.category}
									</Badge>
									<Badge bg="outline-primary">{item.album}</Badge>
									{item.featured && (
										<Badge bg="warning" className="ms-2">
											Featured
										</Badge>
									)}
								</div>
							</Col>
							<Col md={2}>
								<div className="text-muted small">
									<div>
										<FaUser className="me-1" />
										{item.uploadedBy}
									</div>
									<div>
										<FaCalendarAlt className="me-1" />
										{formatDate(item.uploadDate)}
									</div>
									<div>
										<FaFileImage className="me-1" />
										{item.fileSize}
									</div>
								</div>
							</Col>
							<Col md={1}>
								<div className="text-center">
									<div className="text-muted small">
										<FaEye className="me-1" />
										{item.views}
									</div>
									<div className="text-muted small">
										<FaDownload className="me-1" />
										{item.downloads}
									</div>
								</div>
							</Col>
							<Col md={1}>
								<div className="d-flex align-items-center">
									<Form.Check
										type="checkbox"
										checked={selectedImages.includes(item.id)}
										onChange={() => toggleImageSelection(item.id)}
										className="me-2"
									/>
									<Dropdown>
										<Dropdown.Toggle variant="outline-secondary" size="sm">
											<FaEdit />
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item onClick={() => handleViewDetails(item)}>
												<FaEye className="me-2" />
												View Details
											</Dropdown.Item>
											<Dropdown.Item>
												<FaEdit className="me-2" />
												Edit
											</Dropdown.Item>
											<Dropdown.Item>
												<FaDownload className="me-2" />
												Download
											</Dropdown.Item>
											<Dropdown.Divider />
											<Dropdown.Item
												className="text-danger"
												onClick={() => handleDelete(item)}
											>
												<FaTrash className="me-2" />
												Delete
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</div>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			))}
		</div>
	);

	const renderAlbumsView = () => (
		<Row>
			{albums.map((album) => (
				<Col key={album.id} xl={3} lg={4} md={6} className="mb-4">
					<Card className="album-card">
						<div className="position-relative">
							<Image
								src={album.coverImage}
								alt={album.name}
								className="w-100"
								style={{ height: "200px", objectFit: "cover" }}
							/>
							<div className="album-overlay">
								<h5 className="text-white">{album.name}</h5>
								<p className="text-white-50">{album.itemCount} items</p>
							</div>
							{!album.isPublic && (
								<Badge
									bg="secondary"
									className="position-absolute top-0 end-0 m-2"
								>
									Private
								</Badge>
							)}
						</div>
						<Card.Body>
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<h6 className="mb-0">{album.name}</h6>
									<small className="text-muted">{album.itemCount} items</small>
								</div>
								<Dropdown>
									<Dropdown.Toggle variant="outline-secondary" size="sm">
										Actions
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item>
											<FaEye className="me-2" />
											View Album
										</Dropdown.Item>
										<Dropdown.Item>
											<FaEdit className="me-2" />
											Edit Album
										</Dropdown.Item>
										<Dropdown.Item>
											<FaDownload className="me-2" />
											Download All
										</Dropdown.Item>
										<Dropdown.Divider />
										<Dropdown.Item className="text-danger">
											<FaTrash className="me-2" />
											Delete Album
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);

	return (
		<AdminLayout>
			<div className="gallery-management">
				{/* Page Header */}
				<div className="page-header mb-4">
					<Row className="align-items-center">
						<Col>
							<h2 className="page-title">Gallery Management</h2>
							<p className="page-subtitle text-muted">
								Manage university photo gallery and albums
							</p>
						</Col>
						<Col xs="auto">
							<Button
								variant="primary"
								className="me-2"
								onClick={() => setShowUploadModal(true)}
							>
								<FaUpload className="me-2" />
								Upload Images
							</Button>
							<Button
								variant="outline-primary"
								className="me-2"
								onClick={() => setShowAlbumModal(true)}
							>
								<FaFolder className="me-2" />
								New Album
							</Button>
							{selectedImages.length > 0 && (
								<Button variant="outline-danger" onClick={handleBulkDelete}>
									<FaTrash className="me-2" />
									Delete Selected ({selectedImages.length})
								</Button>
							)}
						</Col>
					</Row>
				</div>

				{/* Statistics Cards */}
				<Row className="mb-4">
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaImages className="stats-icon text-primary mb-2" size={24} />
								<h3 className="mb-0">{totalImages}</h3>
								<p className="text-muted mb-0">Total Images</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaFolder className="stats-icon text-success mb-2" size={24} />
								<h3 className="mb-0">{albums.length}</h3>
								<p className="text-muted mb-0">Albums</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaEye className="stats-icon text-info mb-2" size={24} />
								<h3 className="mb-0">{totalViews.toLocaleString()}</h3>
								<p className="text-muted mb-0">Total Views</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaDownload
									className="stats-icon text-warning mb-2"
									size={24}
								/>
								<h3 className="mb-0">{totalDownloads}</h3>
								<p className="text-muted mb-0">Downloads</p>
							</Card.Body>
						</Card>
					</Col>
				</Row>

				{/* Controls */}
				<Card className="mb-4">
					<Card.Body>
						<Tabs
							activeKey={activeTab}
							onSelect={(k) => setActiveTab(k)}
							className="mb-3"
						>
							<Tab eventKey="images" title={`Images (${totalImages})`} />
							<Tab eventKey="albums" title={`Albums (${albums.length})`} />
						</Tabs>

						{activeTab === "images" && (
							<Row className="align-items-center g-3">
								<Col md={4}>
									<InputGroup>
										<InputGroup.Text>
											<FaSearch />
										</InputGroup.Text>
										<Form.Control
											type="text"
											placeholder="Search images by title, description, or tags..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
										/>
									</InputGroup>
								</Col>
								<Col md={2}>
									<Form.Select
										value={selectedCategory}
										onChange={(e) => setSelectedCategory(e.target.value)}
									>
										{categories.map((category) => (
											<option key={category} value={category}>
												{category === "All" ? "All Categories" : category}
											</option>
										))}
									</Form.Select>
								</Col>
								<Col md={2}>
									<Form.Select
										value={selectedAlbum}
										onChange={(e) => setSelectedAlbum(e.target.value)}
									>
										{albumNames.map((album) => (
											<option key={album} value={album}>
												{album === "All" ? "All Albums" : album}
											</option>
										))}
									</Form.Select>
								</Col>
								<Col md={2}>
									<Form.Select
										value={sortBy}
										onChange={(e) => setSortBy(e.target.value)}
									>
										<option value="newest">Newest First</option>
										<option value="oldest">Oldest First</option>
										<option value="mostViewed">Most Viewed</option>
										<option value="title">Title A-Z</option>
									</Form.Select>
								</Col>
								<Col md={2} className="text-end">
									<div className="btn-group">
										<Button
											variant={
												viewMode === "grid" ? "primary" : "outline-primary"
											}
											size="sm"
											onClick={() => setViewMode("grid")}
										>
											<FaTh />
										</Button>
										<Button
											variant={
												viewMode === "list" ? "primary" : "outline-primary"
											}
											size="sm"
											onClick={() => setViewMode("list")}
										>
											<FaList />
										</Button>
									</div>
								</Col>
							</Row>
						)}

						<div className="mt-3 d-flex justify-content-between align-items-center">
							<div className="text-muted">
								{activeTab === "images"
									? `${filteredItems.length} of ${galleryItems.length} images`
									: `${albums.length} albums`}
							</div>
							{selectedImages.length > 0 && (
								<div className="text-muted">
									{selectedImages.length} image(s) selected
								</div>
							)}
						</div>
					</Card.Body>
				</Card>

				{/* Gallery Content */}
				<div className="gallery-content">
					{activeTab === "images" && (
						<>
							{viewMode === "grid" && renderGridView()}
							{viewMode === "list" && renderListView()}
							{filteredItems.length === 0 && (
								<Card>
									<Card.Body className="text-center py-5">
										<FaImages size={48} className="text-muted mb-3" />
										<h5>No images found</h5>
										<p className="text-muted">
											Try adjusting your search criteria or upload new images.
										</p>
										<Button
											variant="primary"
											onClick={() => setShowUploadModal(true)}
										>
											<FaUpload className="me-2" />
											Upload Images
										</Button>
									</Card.Body>
								</Card>
							)}
						</>
					)}

					{activeTab === "albums" && (
						<>
							{renderAlbumsView()}
							{albums.length === 0 && (
								<Card>
									<Card.Body className="text-center py-5">
										<FaFolder size={48} className="text-muted mb-3" />
										<h5>No albums found</h5>
										<p className="text-muted">
											Create your first album to organize your images.
										</p>
										<Button
											variant="primary"
											onClick={() => setShowAlbumModal(true)}
										>
											<FaFolder className="me-2" />
											Create Album
										</Button>
									</Card.Body>
								</Card>
							)}
						</>
					)}
				</div>

				{/* Upload Modal */}
				<Modal
					size="lg"
					show={showUploadModal}
					onHide={() => setShowUploadModal(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>Upload Images</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="upload-area text-center p-5 border border-dashed rounded mb-3">
							<FaCloudUploadAlt size={48} className="text-muted mb-3" />
							<h5>Drag and drop images here</h5>
							<p className="text-muted">or click to browse files</p>
							<Button variant="primary">Choose Files</Button>
						</div>

						{uploadProgress > 0 && (
							<div className="mb-3">
								<div className="d-flex justify-content-between mb-1">
									<span>Uploading...</span>
									<span>{uploadProgress}%</span>
								</div>
								<ProgressBar now={uploadProgress} />
							</div>
						)}

						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Album</Form.Label>
									<Form.Select>
										<option>Select Album</option>
										{albums.map((album) => (
											<option key={album.id} value={album.name}>
												{album.name}
											</option>
										))}
									</Form.Select>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Category</Form.Label>
									<Form.Select>
										<option>Select Category</option>
										{categories
											.filter((cat) => cat !== "All")
											.map((category) => (
												<option key={category} value={category}>
													{category}
												</option>
											))}
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>

						<Form.Group className="mb-3">
							<Form.Label>Tags</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter tags separated by commas"
							/>
							<Form.Text className="text-muted">
								Add relevant tags to help organize and search for images
							</Form.Text>
						</Form.Group>

						<Form.Check
							type="checkbox"
							id="makePublic"
							label="Make images public"
							defaultChecked
							className="mb-3"
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setShowUploadModal(false)}
						>
							Cancel
						</Button>
						<Button variant="primary">
							<FaUpload className="me-2" />
							Upload Images
						</Button>
					</Modal.Footer>
				</Modal>

				{/* Image Details Modal */}
				<Modal
					size="lg"
					show={showDetailsModal}
					onHide={() => setShowDetailsModal(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>Image Details</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{selectedItem && (
							<Row>
								<Col md={8}>
									<Image
										src={selectedItem.thumbnail}
										alt={selectedItem.title}
										className="w-100 mb-3"
										style={{ maxHeight: "400px", objectFit: "contain" }}
									/>
								</Col>
								<Col md={4}>
									<h5>{selectedItem.title}</h5>
									<p className="text-muted">{selectedItem.description}</p>

									<div className="mb-3">
										<Badge bg="secondary" className="me-2">
											{selectedItem.category}
										</Badge>
										<Badge bg="outline-primary">{selectedItem.album}</Badge>
										{selectedItem.featured && (
											<Badge bg="warning" className="ms-2">
												Featured
											</Badge>
										)}
									</div>

									<div className="info-list">
										<div className="info-item mb-2">
											<strong>File Name:</strong> {selectedItem.fileName}
										</div>
										<div className="info-item mb-2">
											<strong>File Size:</strong> {selectedItem.fileSize}
										</div>
										<div className="info-item mb-2">
											<strong>Dimensions:</strong> {selectedItem.dimensions}
										</div>
										<div className="info-item mb-2">
											<strong>Uploaded By:</strong> {selectedItem.uploadedBy}
										</div>
										<div className="info-item mb-2">
											<strong>Upload Date:</strong>{" "}
											{formatDate(selectedItem.uploadDate)}
										</div>
										<div className="info-item mb-2">
											<strong>Views:</strong> {selectedItem.views}
										</div>
										<div className="info-item mb-2">
											<strong>Downloads:</strong> {selectedItem.downloads}
										</div>
										<div className="info-item mb-3">
											<strong>Visibility:</strong>{" "}
											{selectedItem.isPublic ? "Public" : "Private"}
										</div>
									</div>

									<div className="tags mb-3">
										<strong>Tags:</strong>
										<div className="mt-1">
											{selectedItem.tags.map((tag, index) => (
												<Badge
													key={index}
													bg="light"
													text="dark"
													className="me-1 mb-1"
												>
													<FaTag className="me-1" />
													{tag}
												</Badge>
											))}
										</div>
									</div>
								</Col>
							</Row>
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setShowDetailsModal(false)}
						>
							Close
						</Button>
						<Button variant="outline-primary">
							<FaDownload className="me-2" />
							Download
						</Button>
						<Button variant="primary">
							<FaEdit className="me-2" />
							Edit
						</Button>
					</Modal.Footer>
				</Modal>

				{/* Delete Confirmation Modal */}
				<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Confirm Delete</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{selectedImages.length > 0 ? (
							<p>
								Are you sure you want to delete {selectedImages.length} selected
								image(s)?
							</p>
						) : (
							selectedItem && (
								<p>Are you sure you want to delete "{selectedItem.title}"?</p>
							)
						)}
						<p className="text-muted small">
							This action cannot be undone. The image(s) will be permanently
							removed from the gallery.
						</p>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setShowDeleteModal(false)}
						>
							Cancel
						</Button>
						<Button variant="danger" onClick={confirmDelete}>
							Delete
						</Button>
					</Modal.Footer>
				</Modal>

				{/* New Album Modal */}
				<Modal show={showAlbumModal} onHide={() => setShowAlbumModal(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Create New Album</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group className="mb-3">
							<Form.Label>Album Name</Form.Label>
							<Form.Control type="text" placeholder="Enter album name" />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Enter album description"
							/>
						</Form.Group>
						<Form.Check
							type="checkbox"
							id="albumPublic"
							label="Make album public"
							defaultChecked
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setShowAlbumModal(false)}
						>
							Cancel
						</Button>
						<Button variant="primary">
							<FaFolder className="me-2" />
							Create Album
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</AdminLayout>
	);
};

export default GalleryManagement;
