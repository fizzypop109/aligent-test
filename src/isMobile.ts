import { ref, onMounted } from 'vue'

export function checkView() {
    const mobileView = ref(false);

    function update() {
        mobileView.value = window.innerWidth < 1024;
    }

    onMounted(() => {
        update();
        window.addEventListener('resize', update);
    });

    return mobileView;
}