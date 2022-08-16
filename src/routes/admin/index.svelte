<script>
    import { onMount } from 'svelte';

    // let isAvailable = false

    onMount(async () => {
        const pass = prompt()

        if(pass){
            const token = await fetch(`/api/auth/${pass}`).then(res => res.text())
            if(token){
                window.location.replace(`/admin/${token}`)
                localStorage.setItem('token', token);
                // isAvailable = true
            }
        }
    });
</script>