/**
 * Verificação de parênteses/colchetes/chaves balanceados com pilha.
 * Cada fechamento deve casar com o topo da pilha.
 */
public class BalancedParentheses {

    public static boolean isBalanced(String expression) throws OperationFailed {
        Stack<Character> stack = new Stack<>(expression.length() + 1);

        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else if (c == ')' || c == ']' || c == '}') {
                if (stack.isEmpty()) {
                    return false;
                }
                char top = stack.pop();
                if (!matches(top, c)) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }

    private static boolean matches(char open, char close) {
        return (open == '(' && close == ')')
                || (open == '[' && close == ']')
                || (open == '{' && close == '}');
    }
}
