export const  scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    // // Obtengo la posición actual del scroll, uso estas 3 alternativas para asegurarme que la calule en todos los navegadores
    // const currentPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    // if (currentPosition > 0) {
    //   // Calculamos la cantidad de desplazamiento en cada cuadro de animación
    //   const scrollStep = Math.max(Math.floor(-currentPosition / 10), -50);
  
    //   // Realizamos el desplazamiento suave
    //   window.scrollBy(0, scrollStep);
    //   const animationFrame = requestAnimationFrame(scrollToTop);
      
    //   // Detengo la animación cuando se llegue a la parte superior
    //   if (currentPosition <= 0) {
    //     cancelAnimationFrame(animationFrame);
    //   }
    // }
  }
