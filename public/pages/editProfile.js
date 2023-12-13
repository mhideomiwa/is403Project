function deleteUser() {
    if (confirm(`Are you sure you want to delete your account?`)) {
        fetch(`/deleteUser/`, {
            method: 'DELETE'
        }).then(() => {
            redirect("/");
        }).catch(error => {
            console.error('Error deleting user:', error);
            // Handle error, show a message, etc.
        });
    }
}