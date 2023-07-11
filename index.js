import slib from "@randajan/simple-lib";


slib(process.env.NODE_ENV !== "dev", {
    port:4002,
    mode:"node",
    external:["chalk"],
    lib:{
        
    },
    demo:{
        
    }
})