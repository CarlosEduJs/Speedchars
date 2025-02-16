import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";
import { Settings as SettingsIcon } from "lucide-react";
import { useTranslation } from "./translation-provider";
import { Label } from "./ui/label";
import { useGenerateImprove } from "./generate-improve-provider";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";

interface SettingImproveDialogProps {
  disabled: boolean;
}

export default function SettingImproveDialog({
  disabled,
}: SettingImproveDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" disabled={disabled}>
          <SettingsIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Improve Text</DialogTitle>
          <DialogDescription>Improve your text with AI.</DialogDescription>
        </DialogHeader>
        <FormImproveDialog />
      </DialogContent>
    </Dialog>
  );
}

type OptionForm = {
  settingKey: keyof Omit<ReturnType<typeof useGenerateImprove>["settings"], "textObs">;
  label: string;
  options: Record<string, string>;
  type: "checkbox" | "radio";
};

function FormImproveDialog() {
  const { t } = useTranslation();
  const { settings, handleSettingsChange } = useGenerateImprove();

  const options: OptionForm[] = [
    {
      settingKey: "textTone",
      label: t("improve_text.form.item2.label"),
      options: t("improve_text.form.item2.options") as unknown as Record<string, string>,
      type: "radio",
    },
    {
      settingKey: "textObjective",
      label: t("improve_text.form.item3.label"),
      options: t("improve_text.form.item3.options") as unknown as Record<string, string>,
      type: "radio",
    },
    {
      settingKey: "textGrammerAndStyle",
      label: t("improve_text.form.item4.label"),
      options: t("improve_text.form.item4.options") as unknown as Record<string, string>,
      type: "checkbox",
    },
    {
      settingKey: "textComplexity",
      label: t("improve_text.form.item5.label"),
      options: t("improve_text.form.item5.options") as unknown as Record<string, string>,
      type: "radio",
    },
    {
      settingKey: "textAudienceFiltering",
      label: t("improve_text.form.item6.label"),
      options: t("improve_text.form.item6.options") as unknown as Record<string, string>,
      type: "radio",
    },
    {
      settingKey: "textDuration",
      label: t("improve_text.form.item7.label"),
      options: t("improve_text.form.item7.options") as unknown as Record<string, string>,
      type: "radio",
    },
    {
      settingKey: "regionalism",
      label: t("improve_text.form.item8.label"),
      options: t("improve_text.form.item8.options") as unknown as Record<string, string>,
      type: "radio",
    },
    {
      settingKey: "textLayoutAndFormatting",
      label: t("improve_text.form.item9.label"),
      options: t("improve_text.form.item9.options") as unknown as Record<string, string>,
      type: "checkbox",
    },
  ];

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 h-96 overflow-y-auto">
        {options.map((option, index) => (
          <div key={index} className="flex flex-col gap-3 border-b pb-4">
            <Label className="text-sm">
              {index + 1}. {option.label}
            </Label>
            {option.type === "checkbox" ? (
              Object.entries(option.options).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <Checkbox
                    id={key}
                    checked={(
                      (settings[option.settingKey] as { values: string[] }).values || []
                    ).includes(key)}

                    onCheckedChange={(checked) => {
                      console.log("DEBUG: Checkbox changed", option.settingKey, key, checked);
                      handleSettingsChange(
                        option.settingKey,
                        checked
                          ? [
                              ...((settings[option.settingKey] as { values: string[] }).values || []),
                              key,
                            ]
                          : (settings[option.settingKey] as { values: string[] }).values.filter(
                              (item: string) => item !== key
                            )
                      );
                    }}
                  />
                  <Label htmlFor={key} className="text-sm">
                    {value}
                  </Label>
                </div>
              ))
            ) : (
              <RadioGroup
                value={((settings[option.settingKey] as { value: string }).value || "")}
                onValueChange={(value) => {
                  console.log("DEBUG: Radio changed", option.settingKey, value, settings[option.settingKey]);
                  handleSettingsChange(option.settingKey, value);
                }}
              >
                {Object.entries(option.options).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <RadioGroupItem value={key} id={key} />
                    <Label htmlFor={key} className="text-sm">
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        ))}
      </div>
    </form>
  );
}


