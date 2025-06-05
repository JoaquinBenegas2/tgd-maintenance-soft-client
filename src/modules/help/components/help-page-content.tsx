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
          <h2 className="text-xl font-semibold mb-2">Users and roles</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="usuario-1" className="bg-accent px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                How do I create a new user?
              </AccordionTrigger>
              <AccordionContent>
                You can create a new user from the administration panel (before selecting a site),
                in the "Users" section, by clicking "Create User." You must complete the user's
                name, email address, assign a role, and create a password. This user will belong to
                the company and can be assigned to any site within it.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="usuario-2" className="bg-accent px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                What role should I assign to each user?
              </AccordionTrigger>
              <AccordionContent>
                The role depends on their duties: "Supervisor" can create routes and assign
                maintenance; "Operator" can only view and complete assigned maintenance. The "Plant
                Manager" manages the entire company.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* 🛠️ Rutas de mantenimiento */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Maintenance routes</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="ruta-1" className="bg-accent px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                What is a maintenance route?
              </AccordionTrigger>
              <AccordionContent>
                A maintenance route is a periodic schedule of tasks for various elements. It allows
                maintenance to be grouped and assigned to facilitate execution.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ruta-2" className="bg-accent px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                How do I assign operators to a route?
              </AccordionTrigger>
              <AccordionContent>
                From a route's detail view, select the "Operators" tab and use the "Assign
                Operators" button to select available users.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ruta-3" className="bg-accent px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                How do I assign elements to a route?
              </AccordionTrigger>
              <AccordionContent>
                From the route's detail view, select the "Elements" tab and use the "Assign
                Elements" button to select the available elements.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ruta-4" className="bg-accent px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                What happens if a route is delayed?
              </AccordionTrigger>
              <AccordionContent>
                Overdue routes are highlighted in red on the main dashboard. From there, operators
                can directly access and complete pending tasks. The system does not allow
                rescheduling an overdue route, only completing it if it has not yet been executed.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* 🏭 Equipos y elementos */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Equipment and elements</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="equipo-1" className="bg-accent px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                How do I register new teams?
              </AccordionTrigger>
              <AccordionContent>
                Go to the "Equipment" section, click the "+" button, and fill in the information
                such as name, sector, and manufacturer.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="equipo-3" className="bg-accent px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                How do I create a component?
              </AccordionTrigger>
              <AccordionContent>
                Components are created from a piece of equipment detail. In the "Components" table,
                click the "+" button and complete the required information. The component will be
                automatically assigned to the piece of equipment from which it was created.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="equipo-4" className="bg-accent px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                How do I create an item?
              </AccordionTrigger>
              <AccordionContent>
                Items are created from a component's details. Access the component from the table in
                the equipment details, then go to the "Items" table and click the "+" button. The
                item will be automatically assigned to that equipment component and available for
                assignment in maintenance routes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* 📅 Mantenimientos */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Maintenance</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="mant-1" className="bg-accent px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                How is maintenance completed?
              </AccordionTrigger>
              <AccordionContent>
                The operator accesses their task list in the main panel, selects the pending item,
                completes the form, and saves the changes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="mant-2" className="bg-accent px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                What happens if it is not completed on time?
              </AccordionTrigger>
              <AccordionContent>
                The maintenance will be overdue. This will generate an alert in the system so the
                supervisor can take action.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* 🧾 Otros */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Others</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="otros-2" className="bg-accent px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                Does the system send notifications?
              </AccordionTrigger>
              <AccordionContent>
                Yes, the system sends email notifications. You are notified of route delays and
                critical maintenance records.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* 📜 Terminos y Condiciones */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Terms and Conditions</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="otros-1" className="bg-accent px-4 py-1 border-none rounded-lg">
              <AccordionTrigger className="font-bold text-lg hover:no-underline data-[state=open]:text-sidebar-primary">
                See terms and conditions
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
