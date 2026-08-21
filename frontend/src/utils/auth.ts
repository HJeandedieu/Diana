export function logout(navigate?: (to: string) => void) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  if (navigate) {
    navigate("/login");
  } else {
    window.location.href = "/login";
  }
}
