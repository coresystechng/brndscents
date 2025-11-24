<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Brnd Admin || Login</title>
  <!-- plugins:css -->
  <link rel="stylesheet" href="../assets/vendors/mdi/css/materialdesignicons.min.css">
  <link rel="stylesheet" href="../assets/vendors/css/vendor.bundle.base.css">
  <!-- endinject -->
  <!-- Plugin css for this page -->
  <!-- End plugin css for this page -->
  <!-- inject:css -->
  <!-- endinject -->
  <!-- Layout styles -->
  <link rel="stylesheet" href="../assets/css/style.css">
  <link rel="stylesheet" href="../assets/css/styles.css">
  <!-- End layout styles -->
  <link rel="shortcut icon" href="../assets/images/favicon.png" />
</head>
<body>
  <!-- <div id="preloader">
    <div id="loader">
        <span class="load">
          <div class="three-body">
            <div class="three-body__dot"></div>
            <div class="three-body__dot"></div>
            <div class="three-body__dot"></div>
            </div>
        </span>
    </div>
  </div> -->
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="row w-100 m-0">
        <div class="content-wrapper full-page-wrapper d-flex align-items-center auth logi css-selector">
          <div class="card col-lg-4 mx-auto">
            <div class="card-body px-5 py-5">
              <div class="grid-center w-100"><img src="assets/images/favicon-white.png" class="login-logo" alt=""></div>
              <h2 class="card-title text-left mb-3">Login</h2>
              <?php
              if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                  // Retrieve and sanitize form data
                  $retailer_code = sanitizeInput($_POST['retailer_code']);
                  $password = $_POST['password'];

                  // Perform login authentication
                  if (authenticateUser($retailer_code, $password)) {
                      // Login successful, redirect to the welcome page
                      header("Location: ../pages/dashboard.html");
                      exit();
                  } else {
                      // Login failed, display error message
                      echo "Invalid retailer code or password";
                  }
              }

              function sanitizeInput($input) {
                  $input = trim($input);
                  $input = stripslashes($input);
                  $input = htmlspecialchars($input);
                  return $input;
              }

              function authenticateUser($retailer_code, $password) {
                  // Add your database connection code and authentication logic here
                  $servername = "localhost";
                  $username = "root";
                  $db_password = "";
                  $database = "brnd";
                  
                  // Create a database connection
                  $conn = new mysqli($servername, $username, $db_password, $database);

                  // Check the database connection
                  if ($conn->connect_error) {
                      die("Connection failed: " . $conn->connect_error);
                  }

                  // Perform authentication query
                  $stmt = $conn->prepare("SELECT * FROM users WHERE retailer_code = ?");
                  $stmt->bind_param("s", $retailer_code);
                  $stmt->execute();
                  $result = $stmt->get_result();

                  // Check if a matching user record is found
                  if ($result->num_rows === 1) {
                      $row = $result->fetch_assoc();
                      $stored_password = $row['password'];

                      // Verify the password
                      if (password_verify($password, $stored_password)) {
                          // Password is correct, authentication successful
                          return true;
                      }
                  }

                  // Authentication failed
                  return false;
              }
              ?>
              <form id="loginForm" method="POST" action="">
                <div class="form-group">
                  <label>Retailers Code</label>
                  <input type="text" class="form-control p_input" name="retailer_code" id="retailerCodeInput">
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input type="password" class="form-control p_input" name="password" id="passwordInput">
                </div><br>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary btn-block enter-btn">Login</button>
                </div>
              </form>
            </div>
            <a href="register.php"><button type="none" class="btn btn-block">Register</button></a>
            <footer class="footer bg-transparent">
              <div class="w-100 grid-center">
                <span class="d-block text-center"><b>&copy; BRND SCENTS 2023. Built by <u><a href="https://github.com/coresystechng" target="_blank">CORE-TECH</a></u></b>.</span>
              </div>
            </footer>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- row ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <div class="bottom-ever">
  </div>
  <!-- container-scroller -->
  <!-- plugins:js -->
  <script src="../assets/vendors/js/vendor.bundle.base.js"></script>
  <!-- end inject -->
  <!-- Plugin js for this page -->
  <!-- End plugin js for this page -->
  <!-- inject:js -->
  <script src="../assets/js/off-canvas.js"></script>
  <script src="../assets/js/hoverable-collapse.js"></script>
  <script src="../assets/js/misc.js"></script>
  <script src="../assets/js/settings.js"></script>
  <script src="../assets/js/todolist.js"></script>
  <!-- end inject -->
</body>
</html>
