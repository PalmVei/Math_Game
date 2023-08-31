document.addEventListener('DOMContentLoaded', function () {
    const StartB = document.getElementById('StartB');
    const _Score = document.getElementById('score');
    const P1Input = document.getElementById('P1');
    const P2Input = document.getElementById('P2');
    const AnsInput = document.getElementById('Ans');
    const AnsB = document.getElementById('AnsB');
    const Result_T = document.getElementById('Result_T');
    const operatorRadios = document.getElementsByName('operator');
    const radiOT = document.getElementById('radiOT');

    let score = 0;
    let totalQuestions = 0;
    let selectedOperator = "+";
    let C_GenQ = false;

    function GenQ() {
        if (C_GenQ) {
            P1Input.value = Math.floor(Math.random() * 50);
            P2Input.value = Math.floor(Math.random() * 50);
        }
    }

    function CheckAns() {
        const num1 = parseFloat(P1Input.value);
        const num2 = parseFloat(P2Input.value);
        const Ans = parseFloat(AnsInput.value);
        const rigor = 2;
        const Cra = (selectedOperator === 'Plus') ? (num1 + num2) :
                    (selectedOperator === 'Minus') ? (num1 - num2) :
                    (selectedOperator === 'Multiply') ? (num1 * num2) :
                    (selectedOperator === 'Divide') ? (num1 / num2) : 
                    0;
        const CraRounded = Cra.toFixed(rigor);
        const AnsRounded = Ans.toFixed(rigor);

        if (AnsInput.value === '') {
            alert('Please answer first');
            return;
        }

        if (AnsRounded === CraRounded) {
            Result_T.textContent = ' Correct ';
            score++;
        } else {
            Result_T.textContent = 'Incorrect';
        }
        totalQuestions++;
        _Score.textContent = `${score}/${totalQuestions}`;
        GenQ();
        AnsInput.value = '';
    }

    StartB.addEventListener('click', function() {
        score = 0;
        totalQuestions = 0;
        _Score.textContent = '0/0';
        C_GenQ = true;
        GenQ();
        Result_T.textContent = '';
        SetDefault_OPT();
    }
    );

    function SetDefault_OPT() {
        operatorRadios[0].checked = true;
        selectedOperator = operatorRadios[0].value;
        radiOT.textContent = '+';
    }

    for (let i = 0; i < operatorRadios.length; i++) {
        operatorRadios[i].addEventListener('change', function () {
            selectedOperator = operatorRadios[i].value;
            radiOT.textContent = operatorRadios[i].nextSibling.textContent.trim();

            if (AnsInput.value !== '') {
                GenQ();
                Result_T.textContent = '';
            }
        });
    }

    AnsB.addEventListener('click', CheckAns);
    SetDefault_OPT();
    GenQ();
});
