// terminal.js - Realistic Terminal Simulation
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('terminal-content');
    if (!container) return;

    // Configuration
    const config = {
        typingSpeed: 20, // Faster typing
        bootSpeed: 40, // High speed data stream
        prompt: "guest@tahsin314:~$",
        command: "cat bio.txt"
    };

    const bioLines = [
        "I am an AI and machine learning researcher specializing in deep learning for medical imaging.",
        "Currently pursuing a Ph.D. at UT Arlington (PRIMAL Lab).",
        "Interests: 3D Computer Vision, Robotics, Sequence Modeling.",
        "Fun fact: I cook great Bengali food when I'm not procrastinating on research!"
    ];

    class TerminalSimulation {
        constructor(container) {
            this.container = container;
            this.activeSpinner = null;
        }

        async start() {
            // Stage 1: Loading Module with Spinner
            await this.runSpinner("Loading Modules...");
            await this.delay(500);
            this.clearScreen();

            // Stage 2: Self Aware Robot
            await this.typeLine("> BECOMING SELF AWARE...", "highlight-msg");
            await this.delay(800);
            this.printRobot();
            await this.delay(2500);
            this.clearScreen();

            // Stage 3: Human Interaction
            await this.typeLine("> INITIATING HUMAN INTERACTION...", "highlight-msg");
            await this.delay(800);
            this.printHandshake();
            await this.delay(2500);
            this.clearScreen();

            // Stage 4: Final Shell Session
            await this.showPromptAndType();
            await this.showOutput();
            this.showFinalPrompt();
        }

        clearScreen() {
            this.container.innerHTML = '';
        }

        addLine(text, className = "") {
            const line = document.createElement('div');
            line.className = `terminal-line ${className}`;
            line.innerHTML = text; // Allow HTML for preserving whitespace/colors
            this.container.appendChild(line);
            this.scrollToBottom();
            return line;
        }

        async typeLine(text, className = "") {
            const line = this.addLine("", className);
            for (let char of text) {
                line.textContent += char;
                await this.delay(20);
            }
            return line;
        }

        printRobot() {
            // Simple ASCII Robot
            const robotArt = [
                "      d[o_0]b",
                "       |( )|",
                "       d   b",
                "      ROBOT_V1"
            ];
            robotArt.forEach(line => this.addLine(line.replace(/ /g, '&nbsp;'), "system-msg"));
        }

        printHandshake() {
            // Simple ASCII Handshake/Spark
            const handArt = [
                "      ( ^_^)/",
                "      <|   |",
                "       |   |",
                "      HELLO!"
            ];
            handArt.forEach(line => this.addLine(line.replace(/ /g, '&nbsp;'), "success-msg"));
        }

        async runSpinner(text) {
            const line = this.addLine(`${text} |`, "system-msg");
            const frames = ['|', '/', '-', '\\'];
            let i = 0;
            const startTime = Date.now();

            while (Date.now() - startTime < 2500) { // Run for 2.5 seconds
                if (!line.isConnected) break; // Safety check
                line.textContent = `${text} ${frames[i]}`;
                i = (i + 1) % frames.length;
                await this.delay(100);
            }
        }

        scrollToBottom() {
            this.container.scrollTop = this.container.scrollHeight;
        }

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async showPromptAndType() {
            const line = document.createElement('div');
            line.className = 'terminal-line';

            const promptSpan = document.createElement('span');
            promptSpan.className = 'cmd-prompt';
            promptSpan.textContent = config.prompt;

            const cmdSpan = document.createElement('span');
            cmdSpan.className = 'cmd-command typing-cursor';

            line.appendChild(promptSpan);
            line.appendChild(cmdSpan);
            this.container.appendChild(line);

            // Typing effect
            for (let char of config.command) {
                await this.delay(Math.random() * 50 + 50);
                cmdSpan.textContent += char;
            }

            await this.delay(400);
            cmdSpan.classList.remove('typing-cursor');
            await this.delay(200);
        }

        async showOutput() {
            for (let text of bioLines) {
                // Type each line character by character
                await this.typeLine(text);
                // Small pause between lines for readability
                await this.delay(300);
            }
            this.addLine("");
        }

        showFinalPrompt() {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.innerHTML = `<span class="cmd-prompt">${config.prompt}</span><span class="cmd-command typing-cursor"></span>`;
            this.container.appendChild(line);
            this.scrollToBottom();
        }
    }

    // Start Simulation
    const term = new TerminalSimulation(container);
    setTimeout(() => term.start(), 500);
});
