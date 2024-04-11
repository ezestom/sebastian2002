import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import x from "../../icons/x.svg";
import "./ReactForm.css";

export function ReactForm() {
	const [dialog, setDialog] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isMessageSuccess()) {
			toast("¡Formulario enviado con éxito! Gracias por su confianza.", {
				type: "success",
			});
			closeDialog();
		}
	}, []);

	const openDialog = () => {
		setDialog(true);
		document.body.style.overflow = "hidden";
		document.getElementById("navbar").style.display = "none";
	};

	const closeDialog = () => {
		setDialog(false);
		document.body.style.overflow = "auto";
		document.getElementById("navbar").style.display = "flex";
	};

	const isMessageSuccess = () => {
		return window.location.search.includes("success=true");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		setIsLoading(true);

		try {
			const response = await fetch(form.action, {
				method: form.method,
				body: formData,
			});

			if (response.ok) {
				toast(
					"¡Formulario enviado con éxito! Gracias por su confianza.",
					{
						type: "success",
					}
				);
				closeDialog();
			} else {
				throw new Error("Error al enviar el formulario");
			}
		} catch (error) {
			toast.error(
				"Hubo un problema al enviar el formulario, por favor inténtelo de nuevo."
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="relative form-container z-10 m-auto">
			<Toaster />

			<h2 className="text-3xl font-bold text-gray-300 md:text-5xl dark:text-white text-center fixedTitle">
				¿Preparado para comenzar?
			</h2>

			<span className="flex btn-form pt-5">
				<a
					className="relative inline-flex h-12 overflow-hidden  p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 transition hover:scale-105 border border-gray-600 rounded-xl"
					href="#open-dialog"
					onClick={openDialog}
					id="open-dialog">
					<span className="inline-flex h-full w-full bg-[#23262dd9] cursor-pointer items-center justify-center rounded-xl  px-8 py-1  font-medium text-gray-300 backdrop-blur-3xl">
						Ir al formulario
					</span>
				</a>
			</span>

			{dialog && (
				<dialog open>
					<div className="form-container-dialog">
						{isLoading && (
							<div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur bg-white/10 opacity-50 flex justify-center items-center z-50">
								<span class="loader"></span>
							</div>
						)}
						<form
							onSubmit={handleSubmit}
							method="POST"
							action="https://formsubmit.co/ezequielstom@gmail.com">
							<input
								type="hidden"
								name="_cc"
								value="ezequielstom@gmail.com"
							/>

							<input
								type="hidden"
								name="_subject"
								value=" 📩 Nuevo Mensaje | Desde la Web 🗡️!"
							/>
							<input
								type="hidden"
								name="_autoresponse"
								value="Tu mensaje fue exitoso, te responderé a la brevedad!  "></input>
							<input type="hidden" name="_next" value="/" />
							<input
								type="hidden"
								name="_captcha"
								value="false"
							/>
							<legend>
								<a
									className="flex justify-center my-2"
									href="/#contact"
									onClick={closeDialog}>
									<img
										className="inline-flex  cursor-pointer items-center justify-center rounded-full bg-red  p-1 hover:scale-105 transition font-medium text-gray-50 backdrop-blur-3xl"
										src={x.src}
										alt="x-icon"
										id="close-dialog"
									/>
								</a>
							</legend>

							<div className="flex flex-col gap-2 min-w-[350px] ">
								<label htmlFor="name">
									Nombre
									<input
										type="text"
										name="name"
										id="name"
										placeholder="William Wallace"
										className="rounded-md "
										required
									/>
								</label>

								<label htmlFor="email">
									Correo
									<input
										className="rounded-md "
										type="email"
										name="email"
										id="email"
										placeholder="william_wallace@ejemplo.com"
										required
									/>
								</label>
								<label htmlFor="message">
									Mensaje
									<textarea
										name="message"
										id="message"
										placeholder="Escribe tu mensaje aquí.."
										required></textarea>
								</label>
								<button
									className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-[#23262dd9] border border-gray-600   py-2 font-medium text-md text-gray-50 backdrop-blur-3xl hover:scale-105 transition mt-2"
									type="submit">
									Enviar
								</button>
							</div>
						</form>
					</div>
				</dialog>
			)}
		</div>
	);
}
