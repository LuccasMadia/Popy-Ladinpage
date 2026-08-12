"use client";

import { useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useScrollReveal } from "@/lib/useScrollReveal";

interface FormValues {
  nome: string;
  empresa: string;
  tipoEstabelecimento: string;
  telefone: string;
  cidade: string;
  mensagem: string;
}

const initialValues: FormValues = {
  nome: "",
  empresa: "",
  tipoEstabelecimento: "",
  telefone: "",
  cidade: "",
  mensagem: "",
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const PHONE_REGEX = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.nome.trim()) errors.nome = "Informe seu nome.";
  if (!values.empresa.trim()) errors.empresa = "Informe o nome da empresa.";
  if (!values.cidade.trim()) errors.cidade = "Informe a cidade.";
  if (!values.telefone.trim()) {
    errors.telefone = "Informe um telefone.";
  } else if (!PHONE_REGEX.test(values.telefone.trim())) {
    errors.telefone = "Informe um telefone válido, ex: (11) 91234-5678.";
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const scope = useScrollReveal<HTMLElement>();
  const successRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!submitted) return;
      gsap.from(successRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.96,
        duration: 0.7,
        ease: "power3.out",
      });
    },
    { dependencies: [submitted] },
  );

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <section id="contato" className="bg-popy-green/10 px-6 py-24">
        <div
          ref={successRef}
          className="mx-auto max-w-xl rounded-2xl bg-cream p-10 text-center shadow-sm"
        >
          <h2 className="font-display text-3xl text-popy-green">Recebemos seu contato!</h2>
          <p className="mt-3 text-ink/70">
            Em breve nossa equipe vai falar com você sobre a parceria Popy.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contato" ref={scope} className="bg-popy-green/10 px-6 py-24">
      <div className="mx-auto max-w-xl">
        <h2
          data-reveal
          className="text-center font-display text-4xl text-ink md:text-5xl"
        >
          Seja um parceiro
        </h2>
        <p data-reveal className="mt-3 text-center text-ink/70">
          Preencha seus dados e nossa equipe entra em contato para falar sobre a
          parceria.
        </p>
        <form
          onSubmit={handleSubmit}
          noValidate
          data-reveal-stagger
          className="mt-10 space-y-5"
        >
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-ink">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              value={values.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-2 text-ink focus:border-popy-green focus:outline-none"
            />
            {errors.nome && <p className="mt-1 text-sm text-red-700">{errors.nome}</p>}
          </div>
          <div>
            <label htmlFor="empresa" className="block text-sm font-medium text-ink">
              Empresa
            </label>
            <input
              id="empresa"
              type="text"
              value={values.empresa}
              onChange={(e) => handleChange("empresa", e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-2 text-ink focus:border-popy-green focus:outline-none"
            />
            {errors.empresa && (
              <p className="mt-1 text-sm text-red-700">{errors.empresa}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="tipoEstabelecimento"
              className="block text-sm font-medium text-ink"
            >
              Tipo de estabelecimento
            </label>
            <input
              id="tipoEstabelecimento"
              type="text"
              placeholder="Ex: mercado, conveniência, cafeteria"
              value={values.tipoEstabelecimento}
              onChange={(e) => handleChange("tipoEstabelecimento", e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-2 text-ink focus:border-popy-green focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-ink">
              Telefone/WhatsApp
            </label>
            <input
              id="telefone"
              type="tel"
              placeholder="(11) 91234-5678"
              value={values.telefone}
              onChange={(e) => handleChange("telefone", e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-2 text-ink focus:border-popy-green focus:outline-none"
            />
            {errors.telefone && (
              <p className="mt-1 text-sm text-red-700">{errors.telefone}</p>
            )}
          </div>
          <div>
            <label htmlFor="cidade" className="block text-sm font-medium text-ink">
              Cidade
            </label>
            <input
              id="cidade"
              type="text"
              value={values.cidade}
              onChange={(e) => handleChange("cidade", e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-2 text-ink focus:border-popy-green focus:outline-none"
            />
            {errors.cidade && (
              <p className="mt-1 text-sm text-red-700">{errors.cidade}</p>
            )}
          </div>
          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-ink">
              Mensagem (opcional)
            </label>
            <textarea
              id="mensagem"
              rows={4}
              value={values.mensagem}
              onChange={(e) => handleChange("mensagem", e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-2 text-ink focus:border-popy-green focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-popy-red px-6 py-3 font-semibold text-cream transition-colors hover:bg-popy-red-dark"
          >
            Enviar contato
          </button>
        </form>
      </div>
    </section>
  );
}
