module.exports = {
  isValid,
};

function isValid(admin) {
  return Boolean(
    admin.email && admin.password && typeof admin.password === "string"
  );
}
