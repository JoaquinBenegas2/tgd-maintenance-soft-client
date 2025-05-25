import PageHeader from "@/components/custom/page/app-page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import TermsAndConditionsContent from "@/modules/terms-and-conditions/components/terms-and-conditions-content";
import { CircleHelp } from "lucide-react";

export default function HelpPageContent() {
  return (
    <>
      <PageHeader
        icon={<CircleHelp className="w-8 h-8" />}
        title="Help"
        description="Here you can find information about the app and how to use it."
      />
      <div className="space-y-6">
        {/* 🔐 Usuarios y roles */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Usuarios y roles</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="usuario-1" className="bg-white px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                ¿Cómo creo un nuevo usuario?
              </AccordionTrigger>
              <AccordionContent>
                Podés crear un nuevo usuario desde el panel de administración (previo a seleccionar
                una planta), sección "Usuarios", haciendo clic en "Crear usuario". Debés completar
                nombre, correo electrónico, asignarle un rol y crear una contraseña. Este usuario
                pertenecerá a la empresa y se podrá asignar a cualquier planta de la misma.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="usuario-2" className="bg-white px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                ¿Qué rol debo asignar a cada usuario?
              </AccordionTrigger>
              <AccordionContent>
                El rol depende de sus tareas: "Supervisor" puede crear rutas y asignar
                mantenimientos, "Operario" solo puede visualizar y completar mantenimientos
                asignados. El "Administrador de plantas" gestiona toda la empresa.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* 🛠️ Rutas de mantenimiento */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Rutas de mantenimiento</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="ruta-1" className="bg-white px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                ¿Qué es una ruta de mantenimiento?
              </AccordionTrigger>
              <AccordionContent>
                Una ruta de mantenimiento es una planificación periódica de tareas sobre varios
                elementos. Permite agrupar y asignar mantenimientos para facilitar su ejecución.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ruta-2" className="bg-white px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                ¿Cómo asigno operadores a una ruta?
              </AccordionTrigger>
              <AccordionContent>
                Desde la vista de detalle de una ruta, seleccioná la pestaña "Operadores" y usá el
                botón "Asignar operadores" para seleccionar usuarios disponibles.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ruta-2" className="bg-white px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                ¿Cómo asigno elementos a una ruta?
              </AccordionTrigger>
              <AccordionContent>
                Desde la vista de detalle de una ruta, seleccioná la pestaña "Elementos" y usá el
                botón "Asignar elementos" para seleccionar los elementos disponibles.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ruta-3" className="bg-white px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                ¿Qué sucede si una ruta está atrasada?
              </AccordionTrigger>
              <AccordionContent>
                Las rutas que se encuentran atrasadas se destacan en color rojo dentro del panel
                principal del dashboard. Desde allí, los operarios pueden acceder directamente a las
                tareas pendientes y completarlas. El sistema no permite reprogramar una ruta
                vencida, solo finalizarla si aún no fue ejecutada.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* 🏭 Equipos y elementos */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Equipos y elementos</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="equipo-1" className="bg-white px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                ¿Cómo se registran nuevos equipos?
              </AccordionTrigger>
              <AccordionContent>
                Ingresá a la sección "Equipos", hacé clic en el botón "+", completá los datos como
                nombre, sector y fabricante.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="equipo-3" className="bg-white px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                ¿Cómo creo un componente?
              </AccordionTrigger>
              <AccordionContent>
                Los componentes se crean desde el detalle de un equipo. Dentro de la tabla
                "Componentes", hacé clic en el botón "+" y completá los datos requeridos. El
                componente se asignará automáticamente al equipo desde el cual fue creado.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="equipo-4" className="bg-white px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                ¿Cómo creo un elemento?
              </AccordionTrigger>
              <AccordionContent>
                Los elementos se crean desde el detalle de un componente. Accedé al componente desde
                la tabla que figura en el detalle del equipo, luego dirigite a la tabla
                "Elementos" y hacé clic en el botón "+". El elemento quedará automáticamente
                asignado a ese componente del equipo y disponible para ser asignado en rutas de mantenimiento.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* 📅 Mantenimientos */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Mantenimientos</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="mant-1" className="bg-white px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                ¿Cómo se completa un mantenimiento?
              </AccordionTrigger>
              <AccordionContent>
                El operario accede a su lista de tareas en el pane principal, selecciona el elemento pendiente,
                completa el formulario y guarda los cambios.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="mant-2" className="bg-white px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                ¿Qué ocurre si no se completa a tiempo?
              </AccordionTrigger>
              <AccordionContent>
                El mantenimiento pasará a estado "Atrasado". Esto genera una alerta en el sistema
                para que el supervisor tome medidas.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* 🧾 Otros */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Otros</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="otros-1" className="bg-white px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                ¿Puedo generar reportes?
              </AccordionTrigger>
              <AccordionContent>
                Sí, desde la sección "Reportes" podés generar informes de mantenimientos realizados,
                rutas activas, equipos por planta y más. Podés exportarlos en PDF o Excel.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="otros-2" className="bg-white px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                ¿El sistema envía notificaciones?
              </AccordionTrigger>
              <AccordionContent>
                Sí, el sistema envía notificaciones por email o WhatsApp si están configurados los
                canales. Se notifican vencimientos, asignaciones y cambios de estado.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* 📜 Terminos y Condiciones */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Terminos y Condiciones</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="otros-1" className="bg-white px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                Ver terminos y condiciones
              </AccordionTrigger>
              <AccordionContent className="max-h-96 overflow-y-auto">
                <TermsAndConditionsContent />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </>
  );
}
