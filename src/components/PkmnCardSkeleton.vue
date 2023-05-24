<template>
    <div class="p-0.5 h-full
        rounded-tl-md rounded-br-md rounded-tr-3xl rounded-bl-3xl">
        <div class="relative
                            bg-gray-50 dark:bg-lightIndigo/70 h-full
                            rounded-tl-md rounded-br-md rounded-tr-3xl rounded-bl-3xl 
                            shadow-md border-1 border-gray-200">
            <div class="post">
                <div class="rounded-tr-3xl w-full">
                    <!-- Image -->
                    <AnimatedPlaceHolder 
                        height="110px" 
                        width="100%" 
                        borderRadius="0.375rem 1.5rem 0 0" 
                    />
                </div>
                <div class=" py-1">
                    <div class="flex justify-between">
                        <div class=" font-semibold mb-1 text-gray-700 drop-shadow-sm text-sm shadow-gray-200 mx-5">
                        </div>
                        <div class=" font-light mb-1 text-gray-700 drop-shadow-sm text-sm shadow-gray-200 mx-5">
                        </div>
                    </div>
                    <div class=" flex align-items justify-center font-semibold text-center mb-1 text-gray-700 drop-shadow-sm shadow-gray-200">
                        <!-- Name fr -->
                        <AnimatedPlaceHolder 
                            height="25px" 
                            width="70%" 
                            borderRadius="0.375rem 0.375rem 0.375rem 0.375rem" 
                        />
                    </div>
                    <p class=" flex align-items justify-center text-gray-700 text-sm text-center">
                        <AnimatedPlaceHolder 
                            height="20px" 
                            width="50%" 
                            borderRadius="0.375rem 0.375rem 0.375rem 0.375rem" 
                        />
                    </p>
                </div>
            </div>
        </div>
        <div class="-mt-4 relative flex align-items justify-center px-5 text-gray-50 mb-2 gap-3">
                <AnimatedPlaceHolder 
                    height="25px" 
                    width="35%" 
                    borderRadius="9999px" 
                />
                <AnimatedPlaceHolder 
                    height="25px" 
                    width="35%" 
                    borderRadius="9999px" 
                />
        </div>
    </div>
</template>

<script>
import AnimatedPlaceHolder from './AnimatedPlaceHolder.vue';

export default {

    components: {
        AnimatedPlaceHolder,
    },
}

</script>