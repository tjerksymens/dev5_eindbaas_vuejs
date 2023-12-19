<script setup>
import Logo from "../general/Logo.vue";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Shoe } from '../../classes/Shoe';
import { Configurator } from '../../classes/Configurator';
import * as TWEEN from '@tweenjs/tween.js';
import { onMounted } from "vue";

const scene = new THREE.Scene();

const captureSnapshot = () => {
    const canvasContainer = document.getElementById('canvasContainer');

    // Create a new renderer and set its size
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(400, 400);
    renderer.shadowMap.enabled = true;

    // Create a new scene and camera
    const snapshotScene = new THREE.Scene();
    snapshotScene.background = new THREE.Color(0xffffff);
    const snapshotCamera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    snapshotScene.camera = snapshotCamera;

    snapshotCamera.position.set(0, 0.7, 1.5);
    snapshotCamera.lookAt(0, 0.7, -0.5);

    // Clone the objects from the original scene to the snapshot scene
    scene.children.forEach((child) => {
        const clone = child.clone(true);
        snapshotScene.add(clone);
    });
    
    // Set up the renderer for the snapshot scene
    const snapshotCanvas = renderer.domElement;
    canvasContainer.appendChild(snapshotCanvas);

    // Render the snapshot scene
    renderer.render(snapshotScene, snapshotCamera);

    // Get the data URL of the current canvas state
    const dataURL = snapshotCanvas.toDataURL("image/png");

    // Open the data URL in a new tab or window
    const newTab = window.open();
    newTab.document.write(`<img src="${dataURL}" alt="Snapshot" />`);

    // Download the data URL as a file
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'SwearCostomShoeSnapshot.png';
    downloadLink.click();
};

onMounted(() => {
    const draco = new DRACOLoader();
    draco.setDecoderConfig({ type: 'js' });
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.camera = camera;

    // Get the canvasContainer div
    const canvasContainer = document.getElementById('canvasContainer');

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.shadowMap.enabled = true;
    canvasContainer.appendChild(renderer.domElement);

    // Resize function.
    resize();
    window.addEventListener("resize", resize);
    function resize() {
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
        camera.updateProjectionMatrix();
    }

    // GLTF model
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(draco);

    // Shoe
    const shoe = new Shoe(scene);

    // Plane white as floor that receives shadows
    const floorGeometry = new THREE.PlaneGeometry(8, 8);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); 
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 0;
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Configurator
    const configurator = new Configurator(scene);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 2, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 5;

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.25;; 

    camera.position.y = 0.7;
    camera.position.z = 1.5;
    camera.lookAt(0, 0.7, -0.5);

    controls.target.set(0, 0.7, -0.5);


    function animate() {
        requestAnimationFrame( animate );

        TWEEN.update();

        renderer.render( scene, camera );
    }

    animate();

    const orderBtn = document.getElementById('orderBtn');

    orderBtn.addEventListener('click', () => {
        // Get the current configuration
        const currentConfiguration = getCurrentConfiguration();
        console.log(currentConfiguration);

        const shoeName = 'Custom Shoe';
        const price = parseFloat(document.getElementById('price').innerText.replace(',', '.'));
        const selectedSize = document.getElementById('size').value;
        
        // Send the order to the API
        sendOrderToApi(currentConfiguration, shoeName, price, selectedSize);
    });

    function getCurrentConfiguration() {
        const configuration = {};

        // Iterate through all the parts
        configurator.parts.forEach((part) => {
            // Get the current color of the part
            const currentColor = getCurrentColor(part);
            configuration[part] = currentColor;
        });

        return configuration;
    };

    function getCurrentColor(part) {
        let color;
        scene.traverse((child) => {
        if (child.isMesh && child.name === part) {
            color = child.material.color.getHex();
        }
        });
    
        // Convert the color to hex
        const hexColor = '#' + color.toString(16).padStart(6, '0');
        return hexColor;
    }

    function sendOrderToApi(configuration, shoeName, price, selectedSize) {
        // Perform an HTTP request (e.g., using fetch) to send the configuration to your Node.js API
        const token = localStorage.getItem('token');

        const snapshotDataURL = captureSnapshot();

        const orderData = {
            name: shoeName,
            configuration,
            price,
            size: selectedSize,
            snapshot: snapshotDataURL,
        };

        fetch(`https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/shoes/${localStorage.getItem("token")}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Order placed successfully:', data);
            console.log(data.data[0]._id);
            window.location.href =`/confirm/${data.data[0]._id}`;
        })
        .catch((error) => {
            console.error('Error placing order:', error);
        });
    }

    function captureSnapshot() {
        const canvasContainer = document.getElementById('canvasContainer');
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(400, 400);

        renderer.render(snapshotScene, snapshotCamera);

        const dataURL = renderer.domElement.toDataURL("image/png");

        return dataURL;
    }
});


//Wanneer je weggaat van de pagina moet de user een melding krijgen dat hij zijn schoen niet heeft opgeslagen
const openPopup = () => {
    document.querySelector(".popup").classList.add("open__popup");
}

//popup sluiten wanneer er op de popup background wordt geklikt
const closePopup = () => {
    document.querySelector(".popup").classList.remove("open__popup");
}
</script>
<template>
    <header>
        <Logo />
        <nav class="nav--one-button">
            <a href="/profile" class="button__header">Profile</a>
        </nav>
    </header>
    <main class="creator">
        <div id="canvasContainer" class="creator__shoe-display">

        </div>
        <div class="creator__shoe-options">
            <a class="order__close order__close--black" href="#" @click="openPopup"></a>
            <h1 class="shoe__name">Customize your shoe</h1>
            <div class="part__picker">
            <button class="btn btn--prev" id="prevBtn">&lt;</button>
            <span class="part__text" id="part">Inside</span>
            <button class="btn btn--next" id="nextBtn">&gt;</button>
            </div>
            <div id="colorContainer"></div>
            <div class="price-section">
            <span class="price">€<span id="price">200,00</span></span>
            <span class="tax">Sales Tax Included</span>
            </div>
            <div class="size-section">
            <span class="size">Size</span>
            <select id="size">
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
                <option value="45">45</option>
                <option value="46">46</option>
            </select>
            </div>
            <button class="btn" id="captureBtn" @click="captureSnapshot">📷</button>
            <div class="order-section">
                <button id="orderBtn">Place Order</button>
            </div>
        </div>
    </main>
    <div class="popup close__popup">
        <div class="popup__background" @click="closePopup"></div>
        <div class="popup__content">
            <h2 class="popup__title close__popup__title">Are you sure you want to close this screen?</h2>
            <p class="popup__text close__popup__text">You will lose all progress on the order</p>
            <div class="popup__options close__popup__options">
                <a class="popup__option btn btn--positive" href="/">Yes</a>
                <a class="popup__option btn btn--negative" href="#" @click="closePopup">No</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>