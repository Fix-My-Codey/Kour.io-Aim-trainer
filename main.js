let scene, camera, renderer, targets = [];
let score = 0;
let timeLeft = 30;
let gameActive = true;

init();
animate();

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 10, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    // Camera position
    camera.position.z = 5;

    // Create targets
    createTarget();
    createTarget();
    createTarget();

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('click', onMouseClick);
    document.getElementById('reset').addEventListener('click', resetGame);

    // Start timer
    startTimer();
}

function createTarget() {
    const geometry = new THREE.SphereGeometry(0.2);
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const target = new THREE.Mesh(geometry, material);
    
    // Random position
    target.position.x = (Math.random() - 0.5) * 10;
    target.position.y = (Math.random() - 0.5) * 10;
    target.position.z = (Math.random() - 0.5) * 10;
    
    scene.add(target);
    targets.push(target);
}

function onMouseClick(event) {
    if (!gameActive) return;

    // Raycaster setup
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(targets);
    
    if (intersects.length > 0) {
        // Remove hit target
        scene.remove(intersects[0].object);
        targets = targets.filter(t => t !== intersects[0].object);
        score++;
        document.getElementById('score').textContent = score;
        
        // Create new target
        createTarget();
    }
}

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            gameActive = false;
            clearInterval(timerInterval);
            alert(`Game Over! Final Score: ${score}`);
        }
    }, 1000);
}

function resetGame() {
    // Clear scene
    targets.forEach(target => scene.remove(target));
    targets = [];
    score = 0;
    timeLeft = 30;
    gameActive = true;
    
    // Reset UI
    document.getElementById('score').textContent = 0;
    document.getElementById('timer').textContent = 30;
    
    // Create new targets
    createTarget();
    createTarget();
    createTarget();
    
    // Restart timer
    startTimer();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate targets
    targets.forEach(target => {
        target.rotation.x += 0.01;
        target.rotation.y += 0.01;
    });
    
    renderer.render(scene, camera);
}
