import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  CalendarIcon,
  Clock,
  ClipboardList,
  CalendarCheck,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { pl } from "date-fns/locale/pl";
import { cn } from "../../lib/utils";
import { site } from "../../data/site";
import { Toaster, toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

const r = site.reservation;

// Generuje listę godzin (np. 14:00, 14:30, ...) wg site.reservation.timeSlots
const buildTimeSlots = () => {
  const { fromHour, toHour, stepMin } = r.timeSlots;
  const slots: string[] = [];
  for (let h = fromHour; h <= toHour; h++) {
    for (let m = 0; m < 60; m += stepMin) {
      slots.push(`${h}:${m.toString().padStart(2, "0")}`);
    }
  }
  return slots;
};

/**
 * Lista usług do wyboru w formularzu — składana z cennika, żeby nie trzymać
 * jej w dwóch miejscach. Na końcu dokładamy furtkę dla osób, które nie wiedzą,
 * czego dokładnie potrzebują (w usługach to częsty przypadek).
 */
const buildServiceOptions = () => [
  ...site.offer.categories.flatMap((c) => c.items.map((i) => i.name)),
  r.serviceOtherLabel,
];

const Contact = () => {
  const timeSlots = buildTimeSlots();
  const serviceOptions = buildServiceOptions();
  const [agreed, setAgreed] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [phone, setPhone] = useState("+48 ");
  const [time, setTime] = useState(timeSlots[0] ?? "09:00");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (errors.phone) setErrors({ ...errors, phone: false });

    // Ensure +48 prefix
    if (!value.startsWith("+48 ")) {
      value = "+48 " + value.replace(/^\+48\s?/, "");
    }

    // Allow only numbers and space after prefix
    const rawNumber = value.slice(4).replace(/\D/g, "");

    // Format: 000 000 000
    let formattedNumber = "";
    for (let i = 0; i < rawNumber.length; i++) {
      if (i > 0 && i % 3 === 0 && i < 9) {
        formattedNumber += " ";
      }
      formattedNumber += rawNumber[i];
    }

    // Limit length to prevent infinite typing
    if (rawNumber.length > 9) return;

    setPhone("+48 " + formattedNumber);
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = true;
      isValid = false;
    }
    if (phone.length < 13) {
      // +48 + 9 digits + 2 spaces = 15 chars roughly, but let's check length of digits
      // Simple check: "+48 " is 4 chars. We need 9 digits.
      // Current format adds spaces: "+48 123 456 789" -> length 15.
      // Minimal check: has at least some digits.
      // Let's stick to checking if it's default or empty.
      if (phone.trim() === "+48" || phone.trim() === "+48 ") {
        newErrors.phone = true;
        isValid = false;
      }
    }
    if (!email.trim() || !email.includes("@")) {
      newErrors.email = true;
      isValid = false;
    }
    if (!service) {
      newErrors.service = true;
      isValid = false;
    }
    if (!date) {
      newErrors.date = true;
      isValid = false;
    }
    if (!time) {
      newErrors.time = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsConfirmOpen(true);
    } else {
      toast.error(r.toasts.validationTitle, {
        description: r.toasts.validationDesc,
      });
    }
  };

  const handleConfirm = () => {
    // Docelowo tu trafiłoby wysłanie na backend — w demo tylko log.
    console.log("Zgłoszenie potwierdzone:", {
      name,
      phone,
      email,
      service,
      date,
      time,
      message,
    });

    toast.success(r.toasts.successTitle, {
      description: r.toasts.successDesc,
      duration: 5000,
    });

    // Clear form
    setName("");
    setPhone("+48 ");
    setEmail("");
    setService("");
    setDate(new Date());
    setTime(timeSlots[0] ?? "09:00");
    setMessage("");
    setAgreed(false);
    setIsConfirmOpen(false);
    setErrors({});
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-foreground text-white"
    >
      <Toaster position="top-center" richColors />
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Text Content */}
          <div className="lg:col-span-2 text-center lg:text-left space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.9]">
              {r.headingLines.slice(0, -1).map((line, i) => (
                <span key={i}>
                  {line} <br />{" "}
                </span>
              ))}
              <span className="text-primary">
                {r.headingLines[r.headingLines.length - 1]}
              </span>
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed max-w-md mx-auto lg:mx-0">
              {r.subtitle}
            </p>
            <div className="pt-8 border-t border-white/10 mt-8">
              <p className="text-sm text-white/40 mb-2 font-display tracking-wide uppercase">
                {r.directContactLabel}
              </p>
              <div className="flex md:items-start items-center flex-col gap-4 text-xl">
                <a
                  href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
                  className="flex w-full items-center gap-2 border-b border-white/10 pb-4 group"
                >
                  <Phone className="w-5 h-5 group-hover:text-primary transition-colors" />
                  <p className="font-bold text-white group-hover:text-primary transition-colors">
                    {site.contact.phone}
                  </p>
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex w-full items-center gap-2 border-b border-white/10 pb-4 group"
                >
                  <Mail className="w-5 h-5 group-hover:text-primary transition-colors" />
                  <p className="font-bold text-white group-hover:text-primary transition-colors">
                    {site.contact.email}
                  </p>
                </a>
                <a
                  href={site.contact.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-2 border-b border-white/10 pb-4 group"
                >
                  <MapPin className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
                  <p className="font-bold text-white group-hover:text-primary transition-colors">
                    {site.contact.address.full}
                  </p>
                </a>
              </div>
            </div>
            {/* Zewnętrzny system rezerwacji (Booksy / znanylekarz).
                Sekcja znika w całości, gdy firma takiego systemu nie ma —
                pusty kafelek z martwym linkiem wygląda gorzej niż jego brak. */}
            {r.external.enabled && (
              <div className="pt-8 border-t border-white/10 mt-8">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/20 p-2 rounded-lg text-primary">
                      <CalendarCheck className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-display font-medium tracking-wide">
                      {r.external.title}
                    </h4>
                  </div>
                  <p className="text-white/60 text-sm mb-6 font-light leading-relaxed">
                    {r.external.text}
                  </p>
                  <Button
                    onClick={() => window.open(site.links.booking, "_blank")}
                    className="w-full bg-primary text-primary-foreground hover:bg-white hover:text-foreground font-bold tracking-wider uppercase h-12 transition-all flex items-center justify-between px-6 group-hover:shadow-[0_0_20px] group-hover:shadow-primary/30"
                  >
                    {r.external.cta} <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Dark Industrial Form Card */}
          <div className="lg:col-span-3">
            <div className="p-8 md:p-10 bg-dark-surface/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/5 relative group">
              {/* Subtle gold glow border effect */}
              <div className="absolute inset-0 rounded-3xl border border-primary/20 pointer-events-none" />

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1"
                    >
                      {r.labels.name} <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: false });
                      }}
                      className={cn(
                        "w-full bg-white/5 border rounded-xl px-4 py-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-medium placeholder:text-white/20",
                        errors.name ? "border-red-500" : "border-white/10",
                      )}
                      placeholder={r.placeholders.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1"
                    >
                      {r.labels.phone} <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={cn(
                        "w-full bg-white/5 border rounded-xl px-4 py-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-medium tracking-wide placeholder:text-white/20",
                        errors.phone ? "border-red-500" : "border-white/10",
                      )}
                      placeholder={r.placeholders.phone}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1"
                    >
                      {r.labels.email} <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email)
                          setErrors({ ...errors, email: false });
                      }}
                      className={cn(
                        "w-full bg-white/5 border rounded-xl px-4 py-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-medium placeholder:text-white/20",
                        errors.email ? "border-red-500" : "border-white/10",
                      )}
                      placeholder={r.placeholders.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="service"
                      className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1"
                    >
                      {r.labels.service} <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        value={service}
                        onChange={(e) => {
                          setService(e.target.value);
                          if (errors.service)
                            setErrors({ ...errors, service: false });
                        }}
                        className={cn(
                          "w-full bg-white/5 border rounded-xl px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-medium appearance-none cursor-pointer",
                          service ? "text-white" : "text-white/40",
                          errors.service ? "border-red-500" : "border-white/10",
                        )}
                      >
                        <option value="" disabled className="bg-dark-surface">
                          {r.placeholders.service}
                        </option>
                        {serviceOptions.map((option) => (
                          <option
                            key={option}
                            value={option}
                            className="bg-dark-surface text-white"
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                      <ClipboardList className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Custom Date Picker - Dark Theme Adapted */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1">
                      {r.labels.date} <span className="text-primary">*</span>
                    </label>
                    <Popover>
                      <PopoverTrigger className="w-full">
                        <div
                          className={cn(
                            "w-full bg-white/5 border rounded-xl px-4 py-4 text-base flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer text-white",
                            !date && "text-white/40",
                            errors.date ? "border-red-500" : "border-white/10",
                          )}
                        >
                          <span className="font-medium truncate">
                            {date
                              ? format(date, "PPP", { locale: pl })
                              : r.placeholders.date}
                          </span>
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-50 text-primary" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-dark-surface border-white/10 text-white">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => {
                            setDate(newDate);
                            if (newDate && errors.date)
                              setErrors({ ...errors, date: false });
                          }}
                          initialFocus
                          locale={pl}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          className="bg-dark-surface text-white"
                          classNames={{
                            day_selected:
                              "bg-primary text-primary-foreground hover:bg-primary/90",
                            day_today: "bg-white/10 text-white",
                            day: "hover:bg-white/10 text-white rounded-md aria-disabled:opacity-30 aria-disabled:cursor-not-allowed",
                            caption: "text-white",
                            head_cell: "text-white/50",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1">
                      {r.labels.time} <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={time}
                        onChange={(e) => {
                          setTime(e.target.value);
                          if (errors.time)
                            setErrors({ ...errors, time: false });
                        }}
                        className={cn(
                          "w-full bg-white/5 border rounded-xl px-4 py-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-medium appearance-none cursor-pointer",
                          errors.time ? "border-red-500" : "border-white/10",
                        )}
                      >
                        {timeSlots.map((slot) => (
                          <option
                            key={slot}
                            value={slot}
                            className="bg-dark-surface text-white"
                          >
                            {slot}
                          </option>
                        ))}
                      </select>
                      <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1"
                  >
                    {r.labels.message}
                  </label>
                  <input
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all font-medium placeholder:text-white/20"
                    placeholder={r.placeholders.message}
                  />
                </div>

                <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      id="consent"
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-5 h-5 border border-white/20 rounded bg-white/5 focus:ring-3 focus:ring-primary/30 accent-primary cursor-pointer"
                    />
                  </div>
                  <label
                    htmlFor="consent"
                    className="text-xs text-white/60 cursor-pointer select-none leading-relaxed"
                  >
                    {r.consent} <span className="text-primary">*</span>
                  </label>
                </div>

                <Button
                  className="w-full h-16 text-lg font-bold font-display tracking-wide rounded-xl shadow-[0_0_20px] shadow-primary/20 hover:shadow-[0_0_30px] hover:shadow-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  type="button"
                  disabled={!agreed}
                  onClick={handleSubmit}
                >
                  {r.labels.submit}
                </Button>
              </form>
              <p className="text-xs mt-4 text-white/30 text-center leading-relaxed">
                {r.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleConfirm}
        data={{ name, phone, email, service, date, time, message }}
      />
    </section>
  );
};

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  data: {
    name: string;
    phone: string;
    email: string;
    service: string;
    date: Date | undefined;
    time: string;
    message: string;
  };
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  data,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-border sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display tracking-wide text-foreground">
            {r.confirm.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {r.confirm.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-bold text-muted-foreground">
              {r.labels.name}:
            </span>
            <span className="col-span-3 font-medium text-foreground">
              {data.name || "-"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-bold text-muted-foreground">
              {r.labels.phone}:
            </span>
            <span className="col-span-3 font-medium text-foreground">
              {data.phone}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-bold text-muted-foreground">
              {r.labels.email}:
            </span>
            <span className="col-span-3 font-medium text-foreground">
              {data.email || "-"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-bold text-muted-foreground">
              {r.labels.service}:
            </span>
            <span className="col-span-3 font-medium text-foreground">
              {data.service || "-"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-bold text-muted-foreground">
              {r.labels.date}:
            </span>
            <span className="col-span-3 font-medium text-foreground">
              {data.date ? format(data.date, "PPP", { locale: pl }) : "-"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-bold text-muted-foreground">
              {r.labels.time}:
            </span>
            <span className="col-span-3 font-medium text-foreground">
              {data.time}
            </span>
          </div>
          {data.message && (
            <div className="grid grid-cols-4 items-start gap-4">
              <span className="text-right text-sm font-bold text-muted-foreground mt-1">
                {r.labels.message}:
              </span>
              <span className="col-span-3 font-medium text-foreground text-sm">
                {data.message}
              </span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {r.confirm.back}
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {r.confirm.submit}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Contact;
