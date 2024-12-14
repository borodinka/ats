import { useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  type DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { type Control, UseFormSetValue } from "react-hook-form";

import { type Job, type RecruitmentStage } from "../../../types";
import { isCustomSelectObject } from "../../../utils";
import CustomSelect from "../../CustomSelect";
import StageCard from "./StageCard";
import { RECRUITMENT_STAGES } from "./data";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, unknown> | undefined;
  numberOfStages: Job["numberOfStages"];
  selectedStages: Job["stages"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
}

export default function StagesForm({
  control,
  numberOfStages,
  selectedStages,
  setValue,
}: Props) {
  const { onDragEnd } = useStagesList({
    numberOfStages,
    selectedStages,
    setValue,
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="stages-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <CustomSelect
              id="stages"
              name="stages"
              control={control}
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
  );
}

function useStagesList({ numberOfStages, selectedStages, setValue }: Props) {
  const onDragEnd = ({ destination, source }: DropResult): void => {
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
    onDragEnd,
  };
}
