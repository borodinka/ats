import { useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  type DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Stack } from "@mui/material";

import Divider from "@features/ui/Divider";
import { addJob } from "@services/api/job";
import { useAppDispatch, useAppSelector } from "@store/index";

import { type Job, type RecruitmentStage } from "../../../../types";
import { selectJob, setRecruitmentStages } from "../../../store/jobWizardSlice";
import Pagination from "../../navigation/Pagination";
import CustomSelect from "../ui/CustomSelect";
import { isCustomSelectObject } from "../utils";
import NumberInput from "./NumberInput";
import StageCard from "./StageCard";
import { RECRUITMENT_STAGES } from "./data";

interface FormInput {
  numberOfStages: Job["numberOfStages"];
  stages: Job["stages"];
  capacity: Job["capacity"];
}

export default function RecruitmentStages() {
  const {
    handleSubmit,
    control,
    numberOfStages,
    selectedStages,
    onSubmit,
    onDragEnd,
  } = useRecruitmentStagesForm();

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={3}
    >
      <NumberInput
        id="numberOfStages"
        name="numberOfStages"
        title="Number of Stages"
        subtitle="Specify the total number of stages in the recruitment process"
        control={control}
        maxValue={5}
      />
      <Divider />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="stages-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <CustomSelect
                id="stages"
                name="stages"
                control={control}
                title="Recruitment Stages"
                subtitle="List each stage in the order they will occur"
                buttonText="Stage"
                requireErrorText="recruitment stages"
                items={RECRUITMENT_STAGES}
                maxAmount={numberOfStages}
                renderSelectedItem={(item, removeItem) => {
                  if (isCustomSelectObject(item)) {
                    const index = selectedStages.findIndex(
                      (s) => s.id === item.id,
                    );
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <StageCard
                              key={item.id}
                              stage={item as RecruitmentStage}
                              onClose={() => removeItem(item)}
                              control={control}
                              index={index}
                              stageNumber={index + 1}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  }
                  return null;
                }}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Divider />
      <NumberInput
        id="capacity"
        name="capacity"
        title="Total Capacity"
        subtitle="Indicate the maximum number of candidates for this job"
        control={control}
        maxValue={12}
      />
      <Divider />
      <Pagination />
    </Stack>
  );
}

function useRecruitmentStagesForm() {
  const job = useAppSelector(selectJob);
  const { handleSubmit, control, watch, setValue } = useForm<FormInput>({
    defaultValues: {
      numberOfStages: job.numberOfStages,
      stages: job.stages,
      capacity: job.capacity,
    },
  });
  const numberOfStages = watch("numberOfStages");
  const selectedStages = watch("stages");

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    dispatch(setRecruitmentStages(data));
    await addJob({
      ...job,
      numberOfStages: data.numberOfStages,
      stages: data.stages,
      capacity: data.capacity,
    });
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (source.index === destination.index) return;

    const reorderedStages = Array.from(selectedStages);
    const [removed] = reorderedStages.splice(source.index, 1);
    reorderedStages.splice(destination.index, 0, removed);
    setValue("stages", reorderedStages);
  };

  useEffect(() => {
    if (selectedStages.length > numberOfStages) {
      setValue("stages", selectedStages.slice(0, numberOfStages));
    }
  }, [numberOfStages, selectedStages, setValue]);

  return {
    handleSubmit,
    control,
    numberOfStages,
    selectedStages,
    onSubmit,
    onDragEnd,
  };
}
