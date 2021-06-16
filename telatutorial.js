function telatutorial() {
	
	this.preload = function () {
		game.load.image("imagemtutorial", "imagemtutorial.jpg");
		game.load.image("botao_jogar", "botao_jogar.png");
	};
	
	this.create = function () {
		game.add.tileSprite(0, 0, 1280, 720, "imagemtutorial");
		botaojogar = game.add.image(970, 550, "botao_jogar");
		
		botaojogar.inputEnabled = true;
		botaojogar.input.useHandCursor = true;
		
		botaojogar.events.onInputDown.add(jogarFoiClicado);
		
		fadeIn();
	};
	
	this.update = function () {
		
	};
	function jogarFoiClicado() {
		
		// Vamos apenas trocar o fundo do jogo quando a imagem
		// for clicada.
		fadeOut(fadeOutAcabou);	
	}
	
	function fadeOutAcabou() {
		
		// Apenas inicia a primeira tela do jogo.
		game.state.start("tela1");
	}
	
}
