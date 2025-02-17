let scene, camera, renderer, targets = [];
let score = 0;
let timeLeft = 30;
let gameActive = true;
let rotateCamera = true;
let cameraRotationSpeed = 0.002;

init();
animate();

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
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
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') rotateCamera = !rotateCamera;
    });

    // Start timer
    startTimer();
}

function createTarget() {
    const geometry = new THREE.SphereGeometry(0.2);
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const target = new THREE.Mesh(geometry, material);
    
    // Random position with constraints
    target.position.x = (Math.random() - 0.5) * 10;
    target.position.y = (Math.random() - 0.5) * 5;
    target.position.z = (Math.random() - 0.5) * 10;
    
    scene.add(target);
    targets.push(target);
}

// Rest of the functions remain the same until animate function...

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate camera continuously
    if (rotateCamera) {
        camera.rotation.y += cameraRotationSpeed;
    }

    // Rotate targets
    targets.forEach(target => {
        target.rotation.x += 0.01;
        target.rotation.y += 0.01;
    });
    
    renderer.render(scene, camera);
}

// Keep all other functions (onMouseClick, startTimer, resetGame, etc.) the same as before
