<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Brnd Admin || Register</title>
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

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  ::selection {
    color: #a63493;
    background: white;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #10101097;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: white;
    background-size: 900%;
    background-position: center;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a63493;
    background-size: 900%;
    background-position: center;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }
</style>

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
          <div class="card col-lg-6 mx-auto">
            <div class="card-body px-5 show-on-large show-on-med">
              <div class="grid-center w-100"><img src="../assets/images/favicon-white.png" class="login-logo" alt="">
              </div><br>
              <?php
              // Validate and sanitize user input
              function sanitizeInput($input)
              {
                $input = trim($input);
                $input = stripslashes($input);
                $input = htmlspecialchars($input);
                return $input;
              }

              // Validate email format
              function isValidEmail($email)
              {
                return filter_var($email, FILTER_VALIDATE_EMAIL);
              }

              // Validate phone number format
              function isValidPhoneNumber($phone)
              {
                // You can add your own validation logic here
                return preg_match('/^[0-9]{11}$/', $phone);
              }

              if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                // Connect to the database
                $servername = "localhost";
                $username = "root";
                $password = "";
                $database = "brnd";
                $conn = new mysqli($servername, $username, $password, $database);

                // Check the database connection
                if ($conn->connect_error) {
                  die("Connection failed: " . $conn->connect_error);
                }

                // Retrieve and sanitize form data
                $first_name = sanitizeInput($_POST['first_name']);
                $surname = sanitizeInput($_POST['surname']);
                $retailer_code = sanitizeInput($_POST['retailer_code']);
                $phone_number = sanitizeInput($_POST['phone_number']);
                $email = sanitizeInput($_POST['email']);
                $state = sanitizeInput($_POST['state']);
                $password = $_POST['password'];
                $confirm_password = $_POST['confirm_password'];

                // Form validation
                $errors = array();

                if (empty($first_name)) {
                  $errors[] = "First name is required.";
                }

                if (empty($surname)) {
                  $errors[] = "Surname is required.";
                }

                if (empty($retailer_code)) {
                  $errors[] = "Retailer code is required.";
                } else {
                  // Check if the retailer code already exists in the database
                  $existingRetailerCodeQuery = "SELECT * FROM users WHERE retailer_code = '$retailer_code' LIMIT 1";
                  $existingRetailerCodeResult = $conn->query($existingRetailerCodeQuery);
                  if ($existingRetailerCodeResult->num_rows > 0) {
                    $errors[] = "Retailer code already exists.";
                  }
                }

                if (empty($phone_number)) {
                  $errors[] = "Phone number is required.";
                } elseif (!isValidPhoneNumber($phone_number)) {
                  $errors[] = "Invalid phone number format.";
                } else {
                  // Check if the phone number already exists in the database
                  $existingPhoneNumberQuery = "SELECT * FROM users WHERE phone_number = '$phone_number' LIMIT 1";
                  $existingPhoneNumberResult = $conn->query($existingPhoneNumberQuery);
                  if ($existingPhoneNumberResult->num_rows > 0) {
                    $errors[] = "Phone number already exists.";
                  }
                }

                if (empty($email)) {
                  $errors[] = "Email is required.";
                } elseif (!isValidEmail($email)) {
                  $errors[] = "Invalid email format.";
                } else {
                  // Check if the email already exists in the database
                  $existingEmailQuery = "SELECT * FROM users WHERE email = '$email' LIMIT 1";
                  $existingEmailResult = $conn->query($existingEmailQuery);
                  if ($existingEmailResult->num_rows > 0) {
                    $errors[] = "Email already exists.";
                  }
                }

                if (empty($state)) {
                  $errors[] = "State is required.";
                }

                if (empty($password)) {
                  $errors[] = "Password is required.";
                }

                if ($password !== $confirm_password) {
                  $errors[] = "Passwords do not match.";
                }

                // Proceed with database insertion if there are no validation errors
                if (empty($errors)) {
                  // Hash the password
                  $hashed_password = password_hash($password, PASSWORD_DEFAULT);

                  // Prepare and bind the SQL statement
                  $stmt = $conn->prepare("INSERT INTO users (first_name, surname, retailer_code, phone_number, email, state, password) VALUES (?, ?, ?, ?, ?, ?, ?)");
                  $stmt->bind_param("sssssss", $first_name, $surname, $retailer_code, $phone_number, $email, $state, $hashed_password);

                  // Execute the prepared statement
                  if ($stmt->execute()) {
                    echo "Registration successful!";
                    header("Location: ../pages/welcome.html");
                    exit();
                  } else {
                    echo "Error: " . $stmt->error;
                  }

                  // Close the statement
                  $stmt->close();
                } else {
                  // Display validation errors
                  foreach ($errors as $error) {
                    echo "<p style=' color: red;
                                  width: 100%;
                                  padding: 5px;
                                  margin: 0;
                                  background: white;
                                  border-radius:  4px;
                                  font-weight: 600;
                                  text-align: center;'>" . $error . "</p> <br>";
                  }
                }

                // Close the database connection
                $conn->close();
              }
              ?>

              <form class="switch hide-on-lg" method="POST" action="<?php echo $_SERVER["PHP_SELF"]; ?>">
                <div class="row active">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>First Name</label>
                      <input type="text" name="first_name" class="form-control p_input">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Surname</label>
                      <input type="text" name="surname" class="form-control p_input">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Retailer Code</label>
                      <input type="text" maxlength="3" onkeyup="this.value = this.value.toUpperCase();" required name="retailer_code" class="form-control p_input">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Phone Number</label>
                      <input type="text" required name="phone_number" class="form-control p_input">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Email <span class="sm">(Gmail Preferably)</span></label>
                      <input type="email" required name="email" class="form-control p_input">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>State</label>
                      <input type="text" required name="state" class="form-control p_input">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Password</label>
                      <input type="password" required name="password" class="form-control p_input">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Confirm Password</label>
                      <input type="password" required name="confirm_password" class="form-control p_input">
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <i class="mdi-arrow-left mdi switchback mdi-36px"></i>
                  <button type="submit" class="btn btn-primary btn-block enter-btn switchcontrol">Next</button>
                  <button type="submit" style="display: none" class="btn btn-primary btn-block enter-btn hiddenSwitch">Sub mit</button>
                </div>
              </form>
              <form class="hide-on-sm" method="POST" action="<?php echo $_SERVER["PHP_SELF"]; ?>">
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>First Name</label>
                      <input type="text" required name="first_name" class="form-control p_input">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Surname</label>
                      <input type="text" required name="surname" class="form-control p_input">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Retailer Code</label>
                      <input type="text" required name="retailer_code" onkeyup="this.value = this.value.toUpperCase();" maxlength="3" class="form-control p_input">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Phone Number</label>
                      <input type="text" required name="phone_number" class="form-control p_input">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Email <span class="sm">(Gmail Preferably)</span></label>
                      <input type="email" required name="email" class="form-control p_input">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>State</label>
                      <input type="text" required name="state" class="form-control p_input">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Password</label>
                      <input type="password" required name="password" class="form-control p_input">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Confirm Password</label>
                      <input type="password" required name="confirm_password" class="form-control p_input">
                    </div>
                  </div>
                </div><br>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary btn-block enter-btn switchControl">Submit</button>
                </div>
              </form>
            </div>
            <div class="bottom-ever">
              <a href="login.php" class="btn btn-block">Login</a>
              <footer class="footer bg-transparent">
                <div class="w-100 grid-center">
                  <span class="d-block text-center"><b>&copy; BRND SCENTS 2023. Built by <u><a href="https://github.com/coresystechng" target="_blank">CORE-TECH</a></u></b>.</span>
                </div>
              </footer>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- row ends -->
    </div>
    <!-- page-body-wrapper ends -->
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