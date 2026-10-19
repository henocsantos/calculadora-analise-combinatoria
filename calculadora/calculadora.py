import math

class analiseCombinatoria:

    @staticmethod
    def permutacao_simples(n: int) -> int:
        return math.factorial(n)

    @staticmethod
    def permutacao_repeticao(n: int, repeticoes: list[int]) -> int:
        denominador = 1
        for r in repeticoes:
            denominador *= math.factorial(r)
        return math.factorial(n) // denominador

    @staticmethod
    def permutacao_circular(n: int) -> int:
        if n < 1:
            raise ValueError("n deve ser maior ou igual a 1.")
        return math.factorial(n - 1)

    @staticmethod
    def permutacao_caotica(n: int) -> int:
        """Desarranjo (Subfatorial): D(n) = n! * sum((-1)^k / k!)"""
        if n == 0:
            return 1
        if n == 1:
            return 0
        total = 0
        for k in range(n + 1):
            total += ((-1) ** k) * (math.factorial(n) // math.factorial(k))
        return total

    @staticmethod
    def arranjo_simples(n: int, p: int) -> int:
        if p > n:
            raise ValueError("p não pode ser maior que n.")
        return math.factorial(n) // math.factorial(n - p)

    @staticmethod
    def arranjo_repeticao(n: int, p: int) -> int:
        return n**p

    @staticmethod
    def combinacao_simples(n: int, p: int) -> int:
        if p > n:
            raise ValueError("p não pode ser maior que n.")
        return math.comb(n, p)

    @staticmethod
    def combinacao_repeticao(n: int, p: int) -> int:
        # CR(n, p) = C(n + p - 1, p)
        return math.comb(n + p - 1, p)

    @staticmethod
    def binomio_newton(n: int) -> str:
        """Expansão simbólica de (x + y)^n"""
        termos = []
        for k in range(n + 1):
            coef = math.comb(n, k)
            pot_x = n - k
            pot_y = k

            partes = []
            if coef != 1 or (pot_x == 0 and pot_y == 0):
                partes.append(str(coef))

            if pot_x > 0:
                partes.append(f"x^{pot_x}" if pot_x > 1 else "x")
            if pot_y > 0:
                partes.append(f"y^{pot_y}" if pot_y > 1 else "y")

            termos.append("·".join(partes) if partes else "1")
        return " + ".join(termos)

    @staticmethod
    def termo_geral_binomio(n: int, p_posicao: int):
        """Termo T_(p) onde p é a posição ordianária (1º, 2º, etc.), logo k = p_posicao - 1"""
        k = p_posicao - 1
        if k < 0 or k > n:
            raise ValueError(f"Para n={n}, a posição deve estar entre 1 e {n+1}.")
        coef = math.comb(n, k)
        pot_x = n - k
        pot_y = k
        return (
            f"T_{p_posicao} = C({n},{k}) · x^{pot_x} · y^{pot_y} = {coef}x^{pot_x}y^{pot_y}"
        )

    @staticmethod
    def relacao_stifel(n: int, p: int):
        """C(n-1, p-1) + C(n-1, p) = C(n, p)"""
        if p > n or n < 1 or p < 1:
            raise ValueError(
                "Necessário: n >= p >= 1 para validar C(n-1, p-1) + C(n-1, p) = C(n, p)"
            )

        t1 = math.comb(n - 1, p - 1)
        t2 = math.comb(n - 1, p)
        res = math.comb(n, p)
        return t1, t2, res


# ==========================================
# MENUS E INTERFACE CLI
# ==========================================


def ler_int(msg: str) -> int:
    while True:
        try:
            val = int(input(msg))
            if val < 0:
                print("Por favor, digite um número inteiro não-negativo.")
                continue
            return val
        except ValueError:
            print("Entrada inválida. Digite um número inteiro.")


def menu_permutacoes():
    while True:
        print("\n--- [BLOCO 1: PERMUTAÇÕES] ---")
        print("1. Permutação Simples (P_n)")
        print("2. Permutação com Repetição (P_n^(a,b,...))")
        print("3. Permutação Circular (PC_n)")
        print("4. Permutação Caótica / Desarranjo (D_n)")
        print("0. Voltar ao menu principal")
        op = input("Escolha: ")

        try:
            if op == "1":
                n = ler_int("Valor de n: ")
                print(f"Resultado: P({n}) = {analiseCombinatoria.permutacao_simples(n)}")
            elif op == "2":
                n = ler_int("Total de elementos (n): ")
                rep_str = input(
                    "Frequências repetidas separadas por espaço (ex: 2 3): "
                )
                reps = [int(x) for x in rep_str.split() if int(x) > 1]
                if sum(reps) > n:
                    print("A soma das repetições não pode exceder n!")
                    continue
                print(
                    f"Resultado: {analiseCombinatoria.permutacao_repeticao(n, reps)}"
                )
            elif op == "3":
                n = ler_int("Valor de n: ")
                print(
                    f"Resultado: PC({n}) = {analiseCombinatoria.permutacao_circular(n)}"
                )
            elif op == "4":
                n = ler_int("Valor de n: ")
                print(
                    f"Resultado: D({n}) = !{n} = {  analiseCombinatoria.permutacao_caotica(n)}"
                )
            elif op == "0":
                break
            else:
                print("Opção inválida.")
        except Exception as e:
            print(f"Erro: {e}")


def menu_arranjos():
    while True:
        print("\n--- [BLOCO 2: ARRANJOS] ---")
        print("1. Arranjo Simples (A_n,p)")
        print("2. Arranjo com Repetição (AR_n,p)")
        print("0. Voltar ao menu principal")
        op = input("Escolha: ")

        try:
            if op in ["1", "2"]:
                n = ler_int("Valor de n (elementos disponíveis): ")
                p = ler_int("Valor de p (tamanho do agrupamento): ")
                if op == "1":
                    print(
                        f"Resultado: A({n},{p}) = {analiseCombinatoria.arranjo_simples(n, p)}"
                    )
                else:
                    print(
                        f"Resultado: AR({n},{p}) = {analiseCombinatoria.arranjo_repeticao(n, p)}"
                    )
            elif op == "0":
                break
            else:
                print("Opção inválida.")
        except Exception as e:
            print(f"Erro: {e}")


def menu_combinacoes():
    while True:
        print("\n--- [BLOCO 3: COMBINAÇÕES] ---")
        print("1. Combinação Simples (C_n,p)")
        print("2. Combinação com Repetição (CR_n,p)")
        print("0. Voltar ao menu principal")
        op = input("Escolha: ")

        try:
            if op in ["1", "2"]:
                n = ler_int("Valor de n: ")
                p = ler_int("Valor de p: ")
                if op == "1":
                    print(
                        f"Resultado: C({n},{p}) = {analiseCombinatoria.combinacao_simples(n, p)}"
                    )
                else:
                    print(
                        f"Resultado: CR({n},{p}) = {analiseCombinatoria.combinacao_repeticao(n, p)}"
                    )
            elif op == "0":
                break
            else:
                print("Opção inválida.")
        except Exception as e:
            print(f"Erro: {e}")


def menu_binomio():
    while True:
        print("\n--- [BLOCO 4: BINÔMIO DE NEWTON & TEOREMAS] ---")
        print("1. Expansão do Binômio de Newton (x + y)^n")
        print("2. Termo Geral de um Binômio (T_k)")
        print("3. Relação de Stifel")
        print("0. Voltar ao menu principal")
        op = input("Escolha: ")

        try:
            if op == "1":
                n = ler_int("Expoente n: ")
                print(f"(x + y)^{n} = {analiseCombinatoria.binomio_newton(n)}")
            elif op == "2":
                n = ler_int("Expoente n: ")
                pos = ler_int(f"Qual posição do termo deseja? (1 a {n+1}): ")
                print(
                    f"Resultado: {analiseCombinatoria.termo_geral_binomio(n, pos)}"
                )
            elif op == "3":
                n = ler_int("Valor de n: ")
                p = ler_int("Valor de p: ")
                t1, t2, res = analiseCombinatoria.relacao_stifel(n, p)
                print(f"\nRelação: C({n-1}, {p-1}) + C({n-1}, {p}) = C({n}, {p})")
                print(f"Cálculo: {t1} + {t2} = {res}")
                print(f"Validação: {t1 + t2 == res} (Provado)")
            elif op == "0":
                break
            else:
                print("Opção inválida.")
        except Exception as e:
            print(f"Erro: {e}")


def main():
    while True:
        print("\n" + "=" * 45)
        print("   CALCULADORA DE ANÁLISE COMBINATÓRIA")
        print("=" * 45)
        print("1. Bloco de Permutações")
        print("2. Bloco de Arranjos")
        print("3. Bloco de Combinações")
        print("4. Bloco de Binômio de Newton e Teoremas")
        print("0. Sair")
        opcao = input("Selecione um bloco: ")

        if opcao == "1":
            menu_permutacoes()
        elif opcao == "2":
            menu_arranjos()
        elif opcao == "3":
            menu_combinacoes()
        elif opcao == "4":
            menu_binomio()
        elif opcao == "0":
            print("\nEncerrando a calculadora. Até mais!")
            break
        else:
            print("Opção inválida!")


if __name__ == "__main__":
    main()