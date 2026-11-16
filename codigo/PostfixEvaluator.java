/**
 * Avaliação de expressão pós-fixa (notação polonesa reversa) com pilha.
 *
 * Exemplo: "6 2 3 * - 4 +"  ->  6 - (2*3) + 4 = 4
 *
 * Atenção à ordem: ao encontrar um operador, o PRIMEIRO pop é o operando
 * da DIREITA e o SEGUNDO pop é o operando da ESQUERDA.
 */
public class PostfixEvaluator {

    public static long evaluate(String expression) throws OperationFailed {
        String trimmed = expression.trim();
        if (trimmed.isEmpty()) {
            throw new IllegalArgumentException("Expressão vazia");
        }

        String[] tokens = trimmed.split("\\s+");
        Stack<Long> stack = new Stack<>(tokens.length + 1);

        for (String token : tokens) {
            if (token.length() == 1 && "+-*/".contains(token)) {
                long right = stack.pop();
                long left = stack.pop();
                long result;
                switch (token.charAt(0)) {
                    case '+':
                        result = left + right;
                        break;
                    case '-':
                        result = left - right;
                        break;
                    case '*':
                        result = left * right;
                        break;
                    case '/':
                        if (right == 0) {
                            throw new ArithmeticException("Divisão por zero");
                        }
                        result = left / right;
                        break;
                    default:
                        throw new IllegalArgumentException("Operador inválido: " + token);
                }
                stack.push(result);
            } else {
                stack.push(Long.parseLong(token));
            }
        }

        long result = stack.pop();
        if (!stack.isEmpty()) {
            throw new IllegalArgumentException("Expressão mal formada");
        }
        return result;
    }
}
