import { Button } from '@material-ui/core';
import { safeDump } from 'js-yaml';
import React, { useCallback, useContext } from 'react';
import { Hovertips, Select } from '../../../components';
import { ReportContext } from '../../../context/ReportContext';
import { useThemeSettings } from '../../../hooks';
import sounds from '../../../sounds';
import { download, transformFullQuestions } from "../../../utils";
import "./ReportExport.scss";

export default function ReportExport() {
  const { sortedResults, filteredQuizzesMap, report: { settings: playSettings }, reportSettings, setReportSettings } = useContext(ReportContext);
  const { theme, settings } = useThemeSettings();

  const { export: exportState } = reportSettings;
  const { export_type, export_as } = exportState;

  const clonedDownload = useCallback((type) => {
    for (const [, quiz] of filteredQuizzesMap) {
      quiz.questions = transformFullQuestions(quiz.questions);
      type === "yaml" ? download(`${quiz.subject} - ${quiz.topic}.yaml`, safeDump(quiz)) : download(`${quiz.subject} - ${quiz.topic}.json`, JSON.stringify(quiz, undefined, 2))
    }
  }, [filteredQuizzesMap])

  const downloadFiles = () => {
    if (export_as === "JSON") {
      if (export_type === "Report") download(`Report-${Date.now()}.json`, JSON.stringify({
        settings: playSettings,
        results: sortedResults,
        createdAt: Date.now()
      }, undefined, 2));
      else
        clonedDownload("json")
    } else {
      if (export_type === "Report") download(`Report-${Date.now()}.yaml`, safeDump({
        settings: playSettings,
        results: sortedResults,
        createdAt: Date.now()
      }));
      else
        clonedDownload("yaml")
    }
  }

  return (
    <div className="Report-Export" style={{ color: theme.palette.text.primary, backgroundColor: theme.color.base }}>
      <div className="Report-Export-header" style={{ backgroundColor: theme.color.dark }}>Report Export</div>
      <div className="Report-Export-content" style={{ backgroundColor: theme.color.dark }}>
        <Select lsKey={"REPORT_EXPORT"} items={['Quizzes', 'Report']} label={"Export Type"} menuItemLabel={(item) => item} setState={(exportState) => {
          setReportSettings({
            ...reportSettings,
            export: exportState as any
          })
        }} state={exportState} stateKey={"export_type"} />
        <Select lsKey={"REPORT_EXPORT"} items={['YAML', 'JSON']} label={"Export As"} menuItemLabel={(item) => item} setState={(exportState) => {
          setReportSettings({
            ...reportSettings,
            export: exportState as any
          })
        }} state={exportState} stateKey={"export_as"} />

        <Hovertips popoverText={`Export ${export_type} as ${export_as}`} className="Report-Export-button">
          <Button variant="contained" color="primary" onClick={() => {
            settings.sound && sounds.swoosh.play();
            downloadFiles()
          }}>Download</Button>
        </Hovertips>
      </div>
    </div>
  );
}

