import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './setting.css';

const Settings = ({ setSetting, setTableColumn, tableColumn }) => {
  const handleCloseClick = () => {
    setSetting((prev) => !prev);
  };
  const handleChangeClick = () => {
    setTableColumn(dragDropList.filter((item) => selectedList.includes(item)));
    console.log('apply');
  };

  const [dragDropList, setDragDropList] = useState(tableColumn);
  const [selectedList, setSelectedList] = useState(tableColumn);

  const onDragComplete = (result) => {
    if (!result.destination) return;
    const arr = [...dragDropList];
    let removedItem = arr.splice(result.source.index, 1)[0];
    arr.splice(result.destination.index, 0, removedItem);
    setDragDropList(arr);
  };

  const handleClick = (e) => {
    if (e.target.innerText === 'Date' || e.target.innerText === 'App') {
      return;
    }
    document.getElementById(e?.target?.innerText)?.classList.toggle('selected');
    if (selectedList.includes(e.target.innerText)) {
      setSelectedList((prev) => prev.filter((ps) => ps !== e.target.innerText));
    } else {
      setSelectedList([...selectedList, e.target.innerText]);
    }
  };

  return (
    <div className="settings_box">
      <h5 className="heading">Dimensions and Metrics</h5>
      <DragDropContext onDragEnd={onDragComplete}>
        <Droppable droppableId="settings_btns" direction="horizontal">
          {(provided) => (
            <div
              className="settings_btns"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {dragDropList.map((data, i) => (
                <Draggable key={data} draggableId={data} index={i}>
                  {(provided) => (
                    <div
                      id={data}
                      onClick={handleClick}
                      className={`btn_settings selected`}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {data === 'app_id' ? 'App' : data}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="cta_btn">
        <div className="close_btn btn" onClick={handleCloseClick}>
          Close
        </div>
        <div className="apply_btn btn" onClick={handleChangeClick}>
          Apply Change
        </div>
      </div>
    </div>
  );
};

export default Settings;
