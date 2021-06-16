function gameover() {
	
	this.preload = function () {
		game.load.image("gameover", "gameover.jpg");
		game.load.image("botao_jogar", "botao_jogar.png");
	};
	
	this.create = function () {
		game.add.tileSprite(0, 0, 1280, 722, "gameover");
		botaojogar = game.add.image(970, 550, "botao_jogar");
		
		botaojogar.inputEnabled = true;
		botaojogar.input.useHandCursor = true;
		
		botaojogar.events.onInputDown.add(jogarFoiClicado);
		
			var estilo = {
			font: "bold 31px 'Press Start 2P'",
			fill: "#ffffff"
		};
		
		texto = game.add.text(150, 350, "Parabéns, você salvou "+pontuacao+" vida(s),", estilo);
		texto2 = game.add.text(230, 400, "fez mais que o presidente!", estilo);
		fadeIn();
	};
	
	this.update = function () {
		
	};
	function jogarFoiClicado() {

		fadeOut(fadeOutAcabou);	
	}
	
	function fadeOutAcabou() {
		
		// Apenas inicia a primeira tela do jogo.
		game.state.start("tela1");
	}
	
}