<script>
    let email = "";
    let password = "";
</script>

<div class="wrapper">
    <div class="login-form">
        <h2>Login</h2>
        <form class="login-form">
            <div class="input-box">
                <input type="email" bind:value={email} required>
                <label>Email</label>
            </div>

            <div class="input-box">
                <input type="password" bind:value={password} required>
                <label>Password</label>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</div>